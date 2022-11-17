import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from "ionic-cache";
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectorProvider extends ApiProvider {

  constructor(public http: HttpClient, public cache: CacheService) {
    super('https://good-cyan-wombat-wrap.cyclic.app', http, cache);
  }

  getMovies(cityId) {
    return this.get(`events/city/${cityId}`, {cache: true});
  }

  getMovieDetail(id) {
    return this.get(`events/${id}`, {cache: true});
  }

  getTheatersByMovie(cityId, movieId, date) {
    return this.get(`sessions/city/${cityId}/event/${movieId}/date/${date}`, {cache: true});
  }

}
