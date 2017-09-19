import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectorProvider {

  baseUrl = 'https://api-content.ingresso.com/v0';

  constructor(public http: Http) {
  }

  loadStates() {
    return this.http
      .get(this.baseUrl + '/states')
      .map(res => res.json());
  }

  getMovies(cityId, theaterId) {
    return this.http
    .get(`${this.baseUrl}/sessions/city/${cityId}/theater/${theaterId}`)
    .map(res => res.json());
  }
}
