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
  movieDetailsByTheater = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiConnector: ApiConnectorProvider) {
    this.movie  = navParams.data.movie;
    this.cityId = navParams.data.cityId;
    this.getTheaters(this.cityId);
    console.log(this.movieDetailsByTheater);
  }

  buyTickets() {
    alert('era pra abrir a url' + this.movie.siteURL);
  }

  getTheaters(cityId) {
    this.apiConnector
      .getTheaters(cityId)
      .subscribe(data => {
        this.getMoviesByTheater(data.items);
      });
  }

  getMoviesByTheater(theaters) {
    // Implement 'segments' to show the info by data
    // Mock current date
    let date = new Date().toISOString().substr(0, 10);

    theaters.forEach(theater => {
      this.apiConnector
        .getMoviesByTheater(this.cityId, theater.id, date)
        .subscribe(moviesFromTheater => {
          let res = {};
          res['theater']  = theater;
          res['date']     = date;
          res['sessions'] = moviesFromTheater[0].movies
            .filter(f => f.id === this.movie.id);

          this.movieDetailsByTheater.push(res);
        });
    });
  }
}
