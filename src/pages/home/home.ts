import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  states;
  
  constructor(public navCtrl: NavController, public apiConnector: ApiConnectorProvider) {
    let statePromise = apiConnector.loadStates();
    statePromise.subscribe(
      data => {
        this.states = data
      }
    );
  }

}
