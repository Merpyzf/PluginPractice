
![](https://blog-1252413502.cos.ap-shanghai.myqcloud.com/timg.jpeg)
## 开始前准备

### 1. 所需开发环境
1. NodeJs : http://nodejs.cn/
2. Ionic : https://ionicframework.com/
3. Cordova : https://cordova.apache.org/
4. Android : https://developer.android.google.cn/studio/
5. Plugman : https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html#validating-a-plugin-using-plugman  
6. Ionic Native : https://github.com/ionic-team/ionic-native 

### 2. 所需前置技能
1. JavaScript 语法基础
2. TypeScript 语法基础
3. Java 语法基础 
4. Android SDK 基础用法
   

## 插件编写开发实践

以调用 Android 原生 Toast 实现消息提示为例

### 案例运行效果：

<img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/Shell_2020-09-04-19-57-00-475.png" width = "300" />

## 1. 创建插件包

### 使用 Plugman CLI 创建一个空的插件

#### a. 进入到自己存放插件的目录

#### b. 执行如下命令创建插件 & 添加插件所要支持的平台 

创建插件

```
plugman create --name ToastPlugin --plugin_id com.zijin.toastplugin --plugin_version 0.0.1
```

为插件添加所要支持的平台

```
plugman platform add --platform_name android
```

执行上述两个命令后将生成如下的结构：

![](https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599105348815.png)

### 生成插件包中每个文件的作用：

#### a. plugin.xml 

plugin.xml 中定义了插件最后生成平台代码时的文件结构以及针对android平台的一些设置。

一个例子：
```
<?xml version='1.0' encoding='utf-8'?>
<!-- id：即通过 plugman cli 创建插件包时配置的 pluginID -->
<plugin id="com.zijin.toastplugin" version="1.0.0" xmlns="http://apache.org/cordova/ns/plugins/1.0"
        xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- pluginName：即通过 plugman cli 创建插件包时配置的 pluginName -->
    <name>ToastPlugin</name>
    <!-- ⚠️ js-module 标签用于发布定义插件功能的js文件在web端的调用方式。其中的 clobbers 标签的
    作用用于将 www/ToastPlugin.js 文件中定义的接口发布到 window 对象上，这样 web 端就可以直接通过
     cordova.plugins.ToastPlugin 对象来调用暴露的方法去访问插件的功能。

     ⚠️ 当执行 plugin install 的命令安装插件时 cli 会将 www/ToastPlugin.js 拷贝到 platforms/android/platform_ww/
     plugins/cordova-toast-plugin 目录下。
      -->
    <js-module name="ToastPlugin" src="www/ToastPlugin.js">
        <clobbers target="cordova.plugins.ToastPlugin"/>
    </js-module>
    <!--  针对于 Android 平台的配置-->
    <platform name="android">
        <!--  该 config-file 标签会将其内部的子标签追加到 platforms/android/app/src/main/res/xml/config.xml 下-->
        <config-file parent="/*" target="res/xml/config.xml">
            <!-- ⚠️ feature 标签下的 name 定义了插件在 ToastPlugin.js 中调用插件的名称 exec(success, error, 'ToastPlugin',
             'coolMethod', [arg0])；⚠️ 注意：第三个参数要此标签的name保持一致，否则在运行时将无法找到插件。
            -->
            <feature name="ToastPlugin">
                <!-- param 标签定义 ToastPlugin.java 中 ToastPlugin 类的全路径。用于 Cordova Framework 在运行的时候能够根据类的全路径
                       通过反射机制来实例化ToastPlugin对象。
                       ⚠️ 注意：此处 package 的路径一定要与 source-file 中 target-dir 的属性值保持
                       统一。否则在通过反射进行实例化对象的时候将会出现类找不到的异常。
                       ⚠️ 如果你需要说编写的插件在应用启动的时候就去创建，那么需要再添加 <param name="onload" value="true" />，默认
                       的加载方式为调用插件时采取创建插件。
                       -->
                <param name="android-package" value="com.zijin.toastplugin.ToastPlugin"/>
            </feature>
        </config-file>
        <!-- ⚠️ 该 config-file 标签会将其内部的子标签最加到 AndroidManifest.xml 文件的根路径下即 manifest 标签下。
            此文件主要用于为Android平台配置权限、声明创建的服务、声明创建的广播、声明创建的活动、设置应用所能兼容的Android系统的版本等。

            关于 AndroidManifest.xml 的用法参考： https://developer.android.com/guide/topics/manifest/manifest-intro?hl=zh-cn
            -->
        <config-file parent="/*" target="AndroidManifest.xml">
            <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
        </config-file>
        <!-- ⚠️ 该 source-file 标签主要用于指定插件包中的文件在执行 plugin install 命令后所被拷贝到Android平台项目中的位置。
             ⚠️ 此处拷贝到的路径相对于 platforms/android/app，即 platforms/android/app 为根目录。
        -->
        <source-file src="src/android/ToastPlugin.java" target-dir="src/com/zijin/toastplugin/ToastPlugin"/>
    </platform>
</plugin>
```

#### b. src/android/ToastPlugin.java

ToastPlugin 类继承自 CordovaPlugin ，需要去重写 execute 方法，在此方法中根据 action 响应前端的方法调用，以实现对平台层功能的调用。

#### c. www/ToastPlugin.js

向 Web 平台暴露插件所拥有的方法，为前端提供屏蔽原生平台（Android/iOS）的插件功能统一方法的调用。

### 命令参数含义

```
plugman create --name <pluginName> --plugin_id <pluginID> --plugin_version <version> [--path <directory>] 
```
👆以上命令各参数含义：
1. pluginName： 插件名称
2. pluginID： 插件id（即生成ToastPlugin.java的包名）
3. version：插件的版本描述
4. directory：一个绝对路径或相对路径，插件将以该路径作为插件的存放目录，缺省以当执行命令的目录来放置插件包

## 2. 将空的插件包安装到 ionic 项目

### a. 编写 www/ToastPlugin.js 定义插件功能方法
```
var exec = require('cordova/exec');
/**
 * 
 * @param  msgInfo js 对象，包含 msg 和 showLength 两个属性
 * @param  success js 函数对象，当插件功能调用成功时回调
 * @param  error js 函数对象，当插件功能调用失败时回调
 */
exports.showToast = function (msgInfo, success, error) {
    exec(success, error, 'ToastPlugin', 'showToast', msgInfo);
};
```

通过将空的插件包安装到已有的 Ionic 项目能够快速的让我们获得 Cordova Framework 的上下文环境，以此来获得 IDE 代码提示的支持、实现对插件功能的编译运行以进行快速的功能调试。

### b. 进入到插件包所在的目录，使用 npm init 命令初始化插件包（⚠️否则无法执行后续步骤）

### c. 安装插件到 ionic 项目

```
ionic cordova plugin add ../ToastPlugin
```

add 后面为插件包的路径地址，可以是相对路径或绝对路径。

在安装插件时如果 Ionic 项目还没有集成 Cordova 平台，那么在执行安装插件的命令时 Ionic 的 CLI 将会自动为我们集成 Cordova 的环境。

命令执行的运行图如下：

![](file:///Users/wangke/Documents/Gridea/post-images/1599118069842.png)

或在安装插件前就通过 ``` ionic integrations enable cordova``` 命令提前启用 Cordova 环境。

###  3. 编译生成平台代码

通过执行 ``` ionic cordova platform add android ```  命令来生成 Android 平台的代码。

 <img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599119545540.png" width = "300" />
 
⚠️如果权限不足，请使用 超级管理员权限 或 sudo 来执行上述命令。

关于该命令的详细介绍：https://ionicframework.com/docs/cli/commands/cordova-platform

### 4. 使用 AndroidStudio 导入生成的平台代码

### a. 打开 AndroidStuido 选择 Open an existing android studio project

 <img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599121134994.png" width = "600" />

### b. 选择 platforms/android  所在的目录执行导入。

 <img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599121248417.png" width = "600" />

 ⚠️ 在mac平台下，点击 open 后，如果出现如下 permission denied 错误提示，请使用 ``` sudo chmod -R 777 platforms/android  ```  为 android 下的所有文件追加权限。

  <img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599121474498.png" width = "600" />
 
 ⚠️ 导入后 AndroidStudio 将自动执行 Gradle 脚本来下载项目中依赖的三方库并构建项目，由于国内的网络环境，这里很可能会因为网络连接而导致依赖下载出错，如果出错，请大家开启科学上网工具后再进行构建。

<img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599121706643.png" width = "600" />

### c. Gradle构建成功

当Gradle完成项目构建后，AS 会以 Android 项目的目录结构进行展示，同时可以看到运行按钮。

<img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599123505691.png" width = "600" />

在开发者选项中开启 Android 系统的调试模式后通过 USB 数据线连接上电脑 AS 即可识别到你的设备，如果手上没有 Android 真机，可以通过使用 AS 提供的模拟器来进行插件开发。

关于模拟器的使用请参考：https://developer.android.com/studio/run/emulator?hl=zh-cn

### d. 运行项目到设备

点击绿色运行按钮即可将 Ionic 的项目打包成 apk 运行到你连接的设备中。

<img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599124013572.png" width = "300" />

###  4. 开始插件功能开发

打开 ionic 项目，示例项目的目录结构如下：

<img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599185456217.png" width = "300" />

在 home.page.ts 来调用插件（ToastPlugin.js）向前端暴露出的功能方法，代码如下：

```
import {Component} from '@angular/core';
// 1. 使用 declare 声明语句来定义 window 的类型，由于 window 是 JavaScript 中的对象，TypeScript中并不存在，为了能够通过编译，必须要进行声明。
declare const window: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor() {
    }

    showToast() {
        // 2. 通过 window 对象来调用插件中的方法
        window.cordova.plugins.ToastPlugin.showToast({msg: 'hello, cordova plugin!', showLength: 'short'}, success => {
            console.log(success);
        }, error => {
            console.log(error);
        });
    }
}
```
此时当在前端点击 打印消息 的按钮时将会触发 Android 层下的 ToastPlugin 的 execute 方法。接下来将在 Android 层编写插件的功能代码。

Cordova 使用 JSON 作为前端到 Android 插件层的消息传递格式。在插件开发中，我们往往需要对复杂格式的JSON数据进行解析，Android SDK 为我们提供了原生的 JSON 解析类，但解析需要手动的去取每一条内容，为了能够快速方便的实现对 JSON 数据的解析，这里我们引入Gson 来帮我们自动完成数据的解析工作。

以引入 Gson 库为例，介绍两种引入三方库的方式：

1. 通过向 src/main/libs 目录导入下载的 jar 或 aar 包完成对三方库的引入。
2. 通过 Gradle 完成对三方库的引入。

🍭 推荐的方式： __ 尽可能去使用第2种方式来完成对三方库的引入 __  原因：由于我们的项目还会去引入别的三方插件，有些时候无可避免的会遇到别的插件引用了和你相同的三方库，如果通过手动下载 jar 包的方式去引入将会出现 jar 包冲突的错误。

下面通过向 app 下的 build.gradle 中的 dependencies 闭包中添加如下内容：

```
    implementation 'com.google.code.gson:gson:2.6.1'
```

修改 build.gradle 文件点击右上角的 sync now 将自动完成对新增依赖的下载。依赖完成后，我们开始在 ToastPlugin.java 编写如下代码：

```
public class ToastPlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("showToast")) {
            Gson gson = new Gson();
            List<MsgInfo> msgInfoList = gson.fromJson(args.toString(), new TypeToken<List<MsgInfo>>() {
            }.getType());
            this.showToast(msgInfoList, callbackContext);
            return true;
        }
        return false;
    }

    private void showToast(List<MsgInfo> msgInfoList, CallbackContext callbackContext) {
        MsgInfo msgInfo = null;
        if (msgInfoList != null && msgInfoList.size() > 0) {
            msgInfo = msgInfoList.get(0);
        } else {
            callbackContext.error("参数异常");
            return;
        }
        if ("short".equals(msgInfo.getShowLength())) {
            Toast.makeText(cordova.getContext(), msgInfo.getMsg(), Toast.LENGTH_SHORT).show();
            callbackContext.success("消息提示成功");
        } else if ("long".equals(msgInfo.getShowLength())) {
            Toast.makeText(cordova.getContext(), msgInfo.getMsg(), Toast.LENGTH_LONG).show();
            callbackContext.success("消息提示成功");
        } else {
            callbackContext.error("参数异常");
        }
    }
}
```
### 关于上面的代码需要注意的几个点：

#### a. 对于要实现插件功能的类需要继承 CordovaPlugin 并重写 execute 方法来处理前端对插件功能的调用。

#### b. execute 方法参数及返回值的作用。

##### execute 方法的三个参数的含义：

1. String action：action 为前端调用插件的方法名称，在插件开发中我们会根据 action 的值的不同去实现不同的功能。

2. JSONArray args：args 为前端调用插件方法时传递的参数值，是一个 JSONArray 对象。

3. CallbackContext callbackContext：callbackContext 为本次插件方法调用时的回调上下文对象，主要功能是负责处理插件到前端的消息传递。

##### execute 方法返回值的含义：

action 的值为前端调用插件功能方法的名称，即对应插件层的具体某一个功能。如果我们有与之匹配的功能实现时我们需要返回 true ，否则返回 false 告知前端调用者这是一个无效的动作。当返回 false 时， Cordova Framework 会给前端返回一个 INVALID_ACTION 的失败消息。当返回 true 时需要我们自己通过 callbackContext 来返回消息。

#### c. CallbackContext 类的使用

对于是要返回单条还是多条消息需要根据插件实现的功能来判断。假如我们需要编写一个获取设备信息的插件功能，那么只需要返回一条包含设备信息的消息就可以了。如果需要实现电子标签盘点此类的功能，那么插件则就需要不间断的向前端连续传递多条包含电子标签内容的消息。不管是传递单条消息还是多条消息我们都是借助 CallbackContext 类来实现的。

##### 1. 传递单条消息

```
      // 调用error方法将会触发前端的error方法回调的执行 
      callbackContext.error("error message."); 
      // 调用success方法将会触发前端success方法回调的执行
      callbackContext.success("success message.");
```

使用上述的消息传递方式，Cordova Framework 是默认只调用一次 callbackContext.error 或 success 后就不会再向前端继续传递消息。

##### 2. 连续传递多条消息

```
 PluginResult pr = new PluginResult(PluginResult.Status.OK, jsonArray.toString());
 // 一定要设置
 pr.setKeepCallback(true);
 callbackContext.sendPluginResult(pr);
```
通过以上代码我们可以连续向前端发送多条消息，在创建 PluginResult 对象时我们通过第一个参数设置当前消息的成功或失败的状态，通过第二个参数发送具体的消息内容。

如果插件功能调用后无法立即获取到值，我们可以通过如下代码先向前端传递一个空内容。等获取到实际的值时再调用上面的方法返回具体的值。
```
 PluginResult pr = new PluginResult(PluginResult.Status.NO_RESULT);
 pr.setKeepCallback(true);
 callbackContext.sendPluginResult(pr);
```
#### 4. 关于耗时任务的处理

我们在插件中编写的代码是运行在 Android 的主线程中的，如果在插件中我们需要做一些比较耗时的操作，比如文件读写、网络请求、音视频格式转换等，我们需要将这些耗时任务的处理逻辑放到子线程中去执行，否则当耗时任务阻塞主线程的时间过长会导致 ANR 的发生。如果任务执行的耗时过长，Cordova Framework 也会给出我们如下提示，提示我们需要将这个任务放到子线程中去执行。

```
THREAD WARNING: exec() call to ToastPlugin.showToast blocked the main thread for 26ms. Plugin should use CordovaInterface.getThreadPool().
```

我们可以直接使用 Cordova Framework 封装好的线程池来启动线程。

```
       cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                // Perform time-consuming operations
            }
        });
```


👹注意！不能在子线程中做任何和 UI 有关的操作，否则会导致程序崩溃。如果需要更新 UI 请使用Handler 或 getActivity().runOnUiThread() 切换到主线程后再执行与UI相关的操作。

#### 5. 处理插件的生命周期事件

##### 什么是生命周期？

当用户浏览、退出和返回到你的应用时，应用中的 Activity 的实例会在其生命周期的不同状态之间转换，Activity 类会提供许多回调方法，这些回调方法会让 Activity 知晓某个状态已经更改，系统正在创建、停止或恢复某个 Activity，或正在销毁该 Activity 所在的进程。Cordova Framework 会同步 WebView 所属的 Activity 的生命周期的状态到 CordovaPlugin。因此我们可以通过重写 CordovaPlugin 中的生命周期方法来让我们的插件能够响应不同的生命周期事件，以提升应用的稳定性和性能。

下图为Android一个Activity的生命周期事件：

![](https://developer.android.com/guide/components/images/activity_lifecycle.png?hl=zh-cn)

##### CordovaPlugin中的生命周期回调方法

在编写插件时，一般我们只需要对下面三个生命周期方法进行处理：

1. onPause：当应用由可见变为不可见时执行该回调，比如我们按home键返回主页时。一般我们需要在这个方法中暂停插件的执行，比如暂停插件对rfid标签的扫描功能。
2. onResume：当应用由不可见变为可见时会执行该回调，比如我们点击应用图标重新回到应用中时。一般我们需要在这个方法中恢复被暂停的操作，比如恢复插件对rfid标签扫描的功能。
3. onDestory：当用户退出应用时回调，此时我们需要在该回调方法中执行一些资源释放的操作。

###  5. 将开发好的功能抽取为单独的插件包

这一步比较重要，也是比较容易出错的一步。我们在开发插件功能时需要特别关注在插件开发的过程中添加的源代码文件、资源文件、引入的三方库，因为在抽取为单独的插件包时我们需要将开发这个功能时添加的所有内容拷贝到第一步我们创建的插件包中，并根据 platforms/android 中的目录结构来配置 plugin.xml。

在抽取前我们再来检查下为了实现这个插件功能添加了哪些内容：

1. MsgInfo.java
2. ToastPlugin.java
3. 通过 Gradle 版本构建工具引入了 Gson 

第一步：拷贝新增文件到插件包中，我们可以根据源代码的功能来组织文件的存放位置。源代码存放在 src/android 下。

![](https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599207991027.png)

第二步：编写 plugin.xml 文件。

```
<?xml version='1.0' encoding='utf-8'?>
<plugin id="com.zijin.toastplugin" version="1.0.0" xmlns="http://apache.org/cordova/ns/plugins/1.0"
        xmlns:android="http://schemas.android.com/apk/res/android">
    <name>ToastPlugin</name>
    <js-module name="ToastPlugin" src="www/ToastPlugin.js">
        <clobbers target="cordova.plugins.ToastPlugin"/>
    </js-module>
    <platform name="android">
        <config-file parent="/*" target="res/xml/config.xml">
            <feature name="ToastPlugin">
                <param name="android-package" value="com.zijin.toastplugin.ToastPlugin"/>
            </feature>
        </config-file>
        <config-file parent="/*" target="AndroidManifest.xml">
        </config-file>
        <source-file src="src/android/main/ToastPlugin.java" target-dir="src/com/zijin/toastplugin"/>
        <source-file src="src/android/model/MsgInfo.java" target-dir="src/com/zijin/toastplugin"/>
        <framework src="com.google.code.gson:gson:2.6.1" />
    </platform>
</plugin>
```

在文章的一开始就已经介绍过关于 plugin.xml 中标签的作用。这里要强调 source-file 标签中 src 属性的值为文件在插件包中的路径，但 target-dir 就一定需要严格按照之前我们在Android 层实现功能的目录结构来添加。

![](https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599208949155.png)

通过使用 framework 标签在 src 属性中填写 Gson 对应的依赖地址来来完成对 Gson 库的引入。

关于 plugin.xml 的详细配置说明请参考：https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html

当我们完成上面的几步配置后，重新安装插件包再运行 app 来测试插件包的抽取是否成功。


###  6. 为我们编写的插件创建 Ionic Native 包装

通过以上五步我们已经完成了一个 Cordova 插件的编写，但基于 Cordova 编写的插件暴露给前端调用的代码是通过 JavaScript 语言编写的（www/ToastPlugin.js），而 Ionic 是基于 TypeScript 语言的，为了能够在 Ionic 端实现更容易和统一的功能调用，我们需要通过 Ionic Native 来对已经编写好的 Cordova 插件进行一层包装。Ionic Native 将插件中方法的成功或失败的回调包装在 Promise 或 Observable 中，为所有插件提供通用接口。

#### 编写一个 Ionic Native 包装的步骤：

1. 从 Github 克隆 ionic-native 项目到本地，后面命令的执行和插件文件模版的生成需要依赖此环境。
    
    地址：https://github.com/ionic-team/ionic-native

2. 进入克隆下来的 ionic-native 的根目录
   
3. 创建插件包
    ```
    // 调用此命令，并将`PluginName`替换为希望添加的插件名称
    // 第一个字母一定要大写，使用大驼峰命名
    gulp plugin:create -n PluginName
    ```
    执行完以上命令将会在src/@ionic-native/plugins目录下创建一个名称为PluginName的插件目录，里面有一个 index.ts 文件，后面 Ionic 插件的编写要基于该文件。

4. 开始编写 index.ts 文件

    ```   
    @Plugin({
    pluginName: 'ZijinUtilPlugin',
    plugin: 'cordova-plugin-x-zijinutil', // npm package name, example: cordova-plugin-camera
    pluginRef: 'cordova.plugins.ZijinUtil', // the variable reference to call the plugin, example: navigator.geolocation
    platforms: ['Android'] // Array of platforms supported, example: ['Android', 'iOS']
    })
    @Injectable()
    export class ZijinUtilPlugin extends IonicNativePlugin {
    }
    ```
    这里需要重点指出的是 @Plugin装饰器中每个参数的作用：

    1. pluginRef：指的是前端对 Cordova 插件的调用对象，这个值和 Cordova 插件中的 plugin.xml 下的 clobbers 节点的属性值相同。  
    2. plugin：值的是 npm 包的名称。

5. 通过在 ionc native 的根目录调用 npm run build 来进行编译，最后编译生成的 ionic native 包装会生成到 ionic-native/dist/@ionic-native/plugins 目录。

#### 根据上述步骤为 ToastPlugin 插件创建 Ionic Native 包装

1. 通过如下命令创建 ToastPlugin 的 index.ts 文件，在 /src/@ionic-native/plugins/toast-plugin-wrapper/ 下可以找到该文件。
    ``` gulp plugin:create -n ToastPluginWrapper  

2. 编写 index.ts 文件

    ```
    import { Injectable } from '@angular/core';
    import { Plugin, Cordova, CordovaProperty, CordovaInstance, InstanceProperty, IonicNativePlugin } from '@ionic-native/core';
    import { Observable } from 'rxjs';
    @Plugin({
    pluginName: 'ToastPluginWrapper',
    plugin: 'cordova-plugin-toast',
    pluginRef: 'cordova.plugins.ToastPlugin',
    platforms: ['Android']
    })
    @Injectable()
    export class ToastPluginWrapper extends IonicNativePlugin {

    @Cordova()
    showToast(msgInfo: MsgInfo): Promise<string> {
        return;
    }

    }

    export interface MsgInfo {
    msg: string;
    showLength: string;
    }
    ```

    ⚠️ 注意 index.ts 文件中声明插件方法的返回值的类型需要根据 Android 层实现的插件功能是要向前端发送一次消息还是多次。

    1. 向前端只发送一次消息：使用 Promise 作为插件方法的返回值类型
    
    2. 向前端发送多次消息： 使用 Observable 作为插件方法的返回值类型

3. 通过在 ionic-native 的根路径下使用``` npm run build ``` 命令编译源码来生成 ionic 包装文件，生成包装文件的位置 /dist/@ionic-native/plugins/
    ![](https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599217663066.png)

#### 👹可能会遇到到一些坑

1. 在 ionic-native 下编译生成的类型声明包中的 JavaScript 文件内会对 cordova 进行重复引用：
    
    ![](https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599219722709.png)
    解决方法：删除多余引入的 cordova 模块

2. 在类型声明文件 index.d.ts 中为调用 Native 层功能的方法的返回结果指定为 Observable 不生效：
   
    index.d.ts文件内部方法声明：
    ```
    @cordova()
    openScanReceiver(): Observable<any> {
    return;
    }
    ```
    解决方法：
    ![](https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599219912658.png)
    给以上截图中的两个index.js补充 {"observable": true } 

3. 如果需要为 Cordova 插件写一个 IonicNative 包装时，需要注意将传递的参数写在最前面。
    ```
    // 🙆🏻‍♂️正确
    exports.startService = function (interval, success, error) {
        exec(success, error, 'BackgroundTask', 'startService', [interval]);
    };
    // 🙅🏻‍♂️错误，Android 层将无法获取传递的参数
    exports.startService = function (success, error，interval) {
        exec(success, error, 'BackgroundTask', 'startService', [interval]);
    };
    ```

### 7. 在项目中通过 Ionic Native 包装调用 Cordova 插件功能

1. 首先我们需要将上一步生成的 toast-plugin-wrapper 文件夹拷贝到项目下。
2. <img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599219056901.png" width = "600" />
3. 在 appModule 中的 NgModule 元数据中将该服务提供出去，以允许外部通过依赖注入的方式实例化该插件。
    <img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599219176283.png" width = "600" />
4. 调用插件的功能。
    <img src="https://blog-1252413502.cos.ap-shanghai.myqcloud.com/1599219523194.png" width = "600" />
    
### 🎊结束

示例代码地址：https://github.com/Merpyzf/PluginPractice
