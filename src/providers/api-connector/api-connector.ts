import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectorProvider {
  constructor(public http: Http) {
  }

  loadStates() {
    return this.http
      .get('/api/states')
      .map(res => res.json());
  }

  getMovies(cityId) {
    let partnership = 0;

    return this.http
      .get(`/api/events/city/${cityId}/partnership/${partnership}`)
      .map(res => res.json());
  }

}
