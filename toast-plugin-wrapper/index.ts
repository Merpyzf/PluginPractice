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
