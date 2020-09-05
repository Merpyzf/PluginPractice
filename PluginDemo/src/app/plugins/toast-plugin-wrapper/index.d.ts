import { IonicNativePlugin } from '@ionic-native/core';
export declare class ToastPluginWrapperOriginal extends IonicNativePlugin {
    showToast(msgInfo: MsgInfo): Promise<string>;
}
export interface MsgInfo {
    msg: string;
    showLength: string;
}

export declare const ToastPluginWrapper: ToastPluginWrapperOriginal;