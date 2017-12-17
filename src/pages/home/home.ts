import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: any[];
  moviePromises: any[];

  constructor(public navCtrl: NavController, private _apiConnector: ApiConnectorProvider) {
    this.movies = [];
    this.moviePromises = [];

    this._apiConnector.getMovies()
      .subscribe(movies => {
        movies.forEach((movie) => {
          this.moviePromises.push(
            this._apiConnector.getMovieDetails(movie.name)
              .subscribe(movieDetails => this.movies.push(movieDetails))
          );

          Promise.all(this.moviePromises)
            .then(moviePromise => console.log(moviePromise));
        });
      });
  }

}
