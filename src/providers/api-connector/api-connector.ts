import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectorProvider {
  baseUrl = '/api';
  //baseUrl = 'https://api-content.ingresso.com/v0';

  constructor(public http: Http) {
  }

  loadStates() {
    return this.http
      .get(`${this.baseUrl}/states`)
      .map(res => res.json());
  }

  getMovies(cityId) {
    let partnership = 0;

    return this.http
      .get(`${this.baseUrl}/events/city/${cityId}/partnership/${partnership}`)
      .map(res => res.json());
  }

  getMovieDetail(id) {
    let partnership = 0;

    return this.http
      .get(`${this.baseUrl}/events/${id}/partnership/${partnership}`)
      .map(res => res.json());
  }

  getTheaters(cityId) {
    let partnership = 0;

    return this.http
      .get(`${this.baseUrl}/theaters/city/${cityId}/partnership/${partnership}`)
      .map(res => res.json());
  }

  getMoviesByTheater(cityId, theaterId, date) {
    let partnership = 0;

    return this.http
      .get(`${this.baseUrl}/sessions/city/${cityId}/theater/${theaterId}/partnership/${partnership}?date=${date}`)
      .map(res => res.json());
  }

  getTheatersByMovie(cityId, movieId, date) {
    let partnership = 0;

    return this.http
      .get(`${this.baseUrl}/sessions/city/${cityId}/event/${movieId}/partnership/${partnership}?date=${date}`)
      .map(res => res.json());
  }
}
