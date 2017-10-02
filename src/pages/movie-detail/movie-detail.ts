import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {
  movie;
  theaters;
  cityId;
  movieDetails = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiConnector: ApiConnectorProvider) {
    this.movie  = navParams.data.movie;
    this.cityId = navParams.data.cityId;
    this.getTheaters(this.cityId);
    console.log(this.movieDetails);
  }

  buyTickets() {
    alert('era pra abrir a url' + this.movie.siteURL);
  }

  getTheaters(cityId) {
    this.apiConnector
      .getTheaters(cityId)
      .subscribe(data => {
        debugger;
        this.getMoviesByTheater(data.items);
      });
  }

  getMoviesByTheater(theaters) {
    theaters.forEach = theater => {
      this.apiConnector
        .getMoviesByTheater(this.cityId, theater.id)
        .subscribe(data => {
          let movieFilter =
            data.filter = f =>
              f.id === this.movie.id;

          if (movieFilter) {
            this.movieDetails.push(movieFilter);
          }
        });
    }

    theaters.forEach();
  }
}
