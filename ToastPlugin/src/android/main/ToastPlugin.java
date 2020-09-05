package com.zijin.toastplugin;

import android.util.Log;
import android.widget.Toast;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

/**
 * This class echoes a string called from JavaScript.
 */
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
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                // Perform time-consuming operations
            }
        });
    }

}
