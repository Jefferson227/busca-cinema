import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from "ionic-cache";
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectorProvider extends ApiProvider {
  baseUrlMapBox: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/SEARCH_TERM.json?`;
  mapBoxAccessToken: string = 'access_token=pk.eyJ1IjoiamNtdWxsZXIiLCJhIjoiY2l2YmI2ZG82MDA4bzJ6b3UwNTB1enkycSJ9.oRrvDNk1PKKA76v6qSRFXg';
  mapBoxOptions: string = '&autocomplete=true&types=place%2Clocality';
  baseUrlImdb: string = 'https://www.omdbapi.com/?apikey=ec8b5d18&';

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

  getCitiesByName(cityName) {
    return this.http.get(this.getUrlMapBox(cityName, true));
  }

  getCityByLocation(long, lat) {
    return this.http.get(this.getUrlMapBox(`${long},${lat}`, false));
  }

  getUrlMapBox(term: string, hasLimit: boolean): any {
    let baseUrl = this.baseUrlMapBox.replace('SEARCH_TERM', term);
    let limit = hasLimit ? '&limit=10' : '';

    return baseUrl + this.mapBoxAccessToken + this.mapBoxOptions + limit;
  }

  getMovieInfo(movieName: string): any {
    return this.http.get(`${this.baseUrlImdb}t=${movieName}`);
  }
}
