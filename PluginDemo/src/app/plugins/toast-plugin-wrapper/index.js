var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var ToastPluginWrapperOriginal = /** @class */ (function (_super) {
    __extends(ToastPluginWrapperOriginal, _super);
    function ToastPluginWrapperOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToastPluginWrapperOriginal.prototype.showToast = function (msgInfo) { return cordova(this, "showToast", {}, arguments); };
    ToastPluginWrapperOriginal.pluginName = "ToastPluginWrapper";
    ToastPluginWrapperOriginal.plugin = "cordova-plugin-toast";
    ToastPluginWrapperOriginal.pluginRef = "cordova.plugins.ToastPlugin";
    ToastPluginWrapperOriginal.platforms = ["Android"];
    return ToastPluginWrapperOriginal;
}(IonicNativePlugin));
var ToastPluginWrapper = new ToastPluginWrapperOriginal();
export { ToastPluginWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3RvYXN0LXBsdWdpbi13cmFwcGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLDhCQUEwRixNQUFNLG9CQUFvQixDQUFDOztJQVNwRixzQ0FBaUI7Ozs7SUFHdkQsc0NBQVMsYUFBQyxPQUFnQjs7Ozs7NkJBYjVCO0VBVXdDLGlCQUFpQjtTQUE1QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQbHVnaW4sIENvcmRvdmEsIENvcmRvdmFQcm9wZXJ0eSwgQ29yZG92YUluc3RhbmNlLCBJbnN0YW5jZVByb3BlcnR5LCBJb25pY05hdGl2ZVBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ1RvYXN0UGx1Z2luV3JhcHBlcicsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLXRvYXN0JyxcbiAgcGx1Z2luUmVmOiAnY29yZG92YS5wbHVnaW5zLlRvYXN0UGx1Z2luJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnXVxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb2FzdFBsdWdpbldyYXBwZXIgZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG5cbiAgQENvcmRvdmEoKVxuICBzaG93VG9hc3QobXNnSW5mbzogTXNnSW5mbyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNc2dJbmZvIHtcbiAgbXNnOiBzdHJpbmc7XG4gIHNob3dMZW5ndGg6IHN0cmluZztcbn1cbiJdfQ==