import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectorProvider {
  //baseUrl = '/api';
  baseUrl = 'https://busca-cinema-backend.herokuapp.com';

  constructor(public http: Http) {
  }

  getMovies(cityId) {
    return this.http
      .get(`${this.baseUrl}/events/city/${cityId}`)
      .map(res => res.json());
  }

  getMovieDetail(id) {
    return this.http
      .get(`${this.baseUrl}/events/${id}`)
      .map(res => res.json());
  }

  getTheatersByMovie(cityId, movieId, date) {
    return this.http
      .get(`${this.baseUrl}/sessions/city/${cityId}/event/${movieId}/date/${date}`)
      .map(res => res.json());
  }
}
