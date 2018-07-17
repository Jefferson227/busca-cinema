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
  baseUrlImage: string = 'https://image.tmdb.org/t/p/w500';

  constructor(public navCtrl: NavController, private _apiConnector: ApiConnectorProvider) {
    // Initializing arrays
    this.movies = [];

    // Getting all movies
    this._apiConnector.getMovies()
      .subscribe(movies => {
        // For each movie, getting its respective detail
        movies.forEach((movie) => {
          this._apiConnector.getMovieDetails(movie.name)
            .subscribe(movieDetails => {
              if (movieDetails && movieDetails.results.length) {
                let details = movieDetails.results[0];

                details.backdrop_fullpath = `${this.baseUrlImage}${details.backdrop_path}`;
                details.poster_fullpath = `${this.baseUrlImage}${details.poster_path}`;
                details.imageHasLoaded = details.backdrop_path ? true : false;

                this.movies.push(details);
              }
            },
            err => console.error(err),
            () => this.movies.sort((a, b) => {
              // Put the movies in order by release date
              const aTime = new Date(a.release_date).getTime();
              const bTime = new Date(b.release_date).getTime();

              if (aTime > bTime) {
                return -1;
              }
              else if (bTime > aTime) {
                return 1;
              }

              return 0;
            }));
        });
      });
  }

}
