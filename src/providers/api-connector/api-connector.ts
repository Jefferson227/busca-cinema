import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectorProvider extends ApiProvider{

  constructor(public http: HttpClient) {
    super(http, 'https://busca-cinema-backend.herokuapp.com');
  }

  getMovies(cityId) {
    return this.get(`events/city/${cityId}`);
  }

  getMovieDetail(id) {
    return this.get(`events/${id}`);
  }

  getTheatersByMovie(cityId, movieId, date) {
    return this.get(`sessions/city/${cityId}/event/${movieId}/date/${date}`);
  }
}
