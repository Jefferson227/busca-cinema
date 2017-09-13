import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiConnectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiConnectorProvider {

  constructor(public http: Http) {
    this.loadStates = () => this.http
      .get('https://api-content.ingresso.com/v0/states')
      .map(res => res.json());
  }

  loadStates;
}
