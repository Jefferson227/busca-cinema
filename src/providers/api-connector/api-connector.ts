import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from "ionic-cache";
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectorProvider extends ApiProvider {

  constructor(public http: HttpClient, public cache: CacheService) {
    super('https://busca-cinema-bck-can-mirror.herokuapp.com', http, cache);
  }

  getMovies() {
    return this.get(`movies`, {cache: true});
  }

  getTheatersByCity(cityName) {
    return this.get(`theaters/${cityName}`, {cache: true});
  }

  getSessionsByTheater(theaterId, date) {
    return this.get(`sessions/${theaterId}/${date}`, {cache: true});
  }

  getTheatersByMovie(cityName, movieId, date) {
    return this.get(`movie/${movieId}/theaters/${cityName}/${date}`, {cache: true});
  }

}
