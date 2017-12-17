import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiConnectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiConnectorProvider {

  constructor(public http: HttpClient) {
  }

  getMovies(): any {
    return this.http.get('http://busca-cinema-bck-can-mirror.herokuapp.com/movies');
  }

  getMovieDetails(movieTitle: string): any {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=5161994a2b7c39573e265db702445c78&query=${movieTitle}`);
  }
}
