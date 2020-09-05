var exec = require('cordova/exec');
/**
 * 
 * @param  msgInfo js 对象，包含 msg 和 showLength 两个属性
 * @param  success js 函数对象，当插件功能调用成功时回调
 * @param  error js 函数对象，当插件功能调用失败时回调
 */
exports.showToast = function (msgInfo, success, error) {
    exec(success, error, 'ToastPlugin', 'showToast', [msgInfo]);
};
