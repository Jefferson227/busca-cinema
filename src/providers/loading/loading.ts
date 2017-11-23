import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  message = 'Loading...';

  constructor(public loadingCtrl: LoadingController) {
  }

  initialize() {
    return this.loadingCtrl.create({
      content: this.message
    });
  }

  show(loading) {
    loading.present();
  }

  hide(loading) {
    loading.dismiss();
  }
}