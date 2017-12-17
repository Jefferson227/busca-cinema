import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiConnectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiConnectorProvider {
  // Base URLs
  buscaCinemaBaseUrl: string = 'http://busca-cinema-bck-can-mirror.herokuapp.com';
  theMovieDdBaseUrl: string = 'https://api.themoviedb.org/3/search/movie?api_key=5161994a2b7c39573e265db702445c78';

  constructor(public http: HttpClient) {
  }

  // Get all movies
  getMovies(): any {
    return this.http.get(`${this.buscaCinemaBaseUrl}/movies`);
  }

  // Get details from a movie
  getMovieDetails(movieTitle: string): any {
    return this.http.get(`${this.theMovieDdBaseUrl}&query=${movieTitle}`);
  }
}
