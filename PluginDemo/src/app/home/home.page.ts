import {Component} from '@angular/core';
import {ToastPluginWrapper} from '../plugins/toast-plugin-wrapper/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(private toastPlugin: ToastPluginWrapper) {
    }

    showToast() {
        this.toastPlugin.showToast({msg: 'hello, cordova plugin!', showLength: 'long'})
            .then(value => {
                console.log(value);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
