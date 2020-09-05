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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var ToastPluginWrapper = /** @class */ (function (_super) {
    __extends(ToastPluginWrapper, _super);
    function ToastPluginWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToastPluginWrapper.prototype.showToast = function (msgInfo) { return cordova(this, "showToast", {}, arguments); };
    ToastPluginWrapper.pluginName = "ToastPluginWrapper";
    ToastPluginWrapper.plugin = "cordova-plugin-toast";
    ToastPluginWrapper.pluginRef = "cordova.plugins.ToastPlugin";
    ToastPluginWrapper.platforms = ["Android"];
    ToastPluginWrapper = __decorate([
        Injectable()
    ], ToastPluginWrapper);
    return ToastPluginWrapper;
}(IonicNativePlugin));
export { ToastPluginWrapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3RvYXN0LXBsdWdpbi13cmFwcGVyL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDhCQUEwRixNQUFNLG9CQUFvQixDQUFDOztJQVNwRixzQ0FBaUI7Ozs7SUFHdkQsc0NBQVMsYUFBQyxPQUFnQjs7Ozs7SUFIZixrQkFBa0I7UUFEOUIsVUFBVSxFQUFFO09BQ0Esa0JBQWtCOzZCQVYvQjtFQVV3QyxpQkFBaUI7U0FBNUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGx1Z2luLCBDb3Jkb3ZhLCBDb3Jkb3ZhUHJvcGVydHksIENvcmRvdmFJbnN0YW5jZSwgSW5zdGFuY2VQcm9wZXJ0eSwgSW9uaWNOYXRpdmVQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdUb2FzdFBsdWdpbldyYXBwZXInLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi10b2FzdCcsXG4gIHBsdWdpblJlZjogJ2NvcmRvdmEucGx1Z2lucy5Ub2FzdFBsdWdpbicsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9hc3RQbHVnaW5XcmFwcGVyIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuXG4gIEBDb3Jkb3ZhKClcbiAgc2hvd1RvYXN0KG1zZ0luZm86IE1zZ0luZm8pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXNnSW5mbyB7XG4gIG1zZzogc3RyaW5nO1xuICBzaG93TGVuZ3RoOiBzdHJpbmc7XG59XG4iXX0=