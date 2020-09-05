import { IonicNativePlugin } from '@ionic-native/core';
export declare class ToastPluginWrapper extends IonicNativePlugin {
    showToast(msgInfo: MsgInfo): Promise<string>;
}
export interface MsgInfo {
    msg: string;
    showLength: string;
}
