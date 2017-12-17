import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Variables
  movies: any[];
  moviePromises: any[];
  baseUrlImage: string = 'https://image.tmdb.org/t/p/w500';

  constructor(public navCtrl: NavController, private _apiConnector: ApiConnectorProvider) {
    // Initializing arrays
    this.movies = [];
    this.moviePromises = [];

    // Getting all movies
    this._apiConnector.getMovies()
      .subscribe(movies => {
        // For each movies, getting its respecitve detail
        movies.forEach((movie) => {
          this.moviePromises.push(

            this._apiConnector.getMovieDetails(movie.name)
              .subscribe(movieDetails => {

                if (movieDetails && movieDetails.results.length) {
                  let details = movieDetails.results[0];
                  details.backdrop_fullpath = `${this.baseUrlImage}${details.backdrop_path}`;
                  details.poster_fullpath = `${this.baseUrlImage}${details.poster_path}`;

                  this.movies.push(details);
                }

              })

          );

          // Executing all promises with movie details
          Promise.all(this.moviePromises);
        });
      });
  }

}
