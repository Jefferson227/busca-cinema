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

  getMovies(cityId, theaterId) {
    return this.http
      .get(`/api/sessions/city/${cityId}/theater/${theaterId}`)
      .map(res => res.json());
  }

}
