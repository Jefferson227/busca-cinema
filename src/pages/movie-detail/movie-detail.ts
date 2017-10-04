import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
import moment from 'moment';

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
  segmentSessionDates;
  movieDetailsByTheater = [];
  sessionDates          = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiConnector: ApiConnectorProvider) {
    this.movie  = navParams.data.movie;
    this.cityId = navParams.data.cityId;
    this.getTheaters(this.cityId);
    this.getSessionDates();
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
    let date = moment(this.segmentSessionDates, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let vm   = this;

    theaters.forEach(theater => {
      vm.movieDetailsByTheater = [];

      this.apiConnector
        .getMoviesByTheater(vm.cityId, theater.id, date)
        .subscribe(moviesFromTheater => {
          if (moviesFromTheater) {
            let movie = moviesFromTheater[0].movies
              .find(f => f.id === vm.movie.id);

            if (movie) {
              vm.movieDetailsByTheater.push({
                rooms: movie.rooms,
                theater: theater.name
              });
            }
          }
        });
    });
  }

  getSessionDates() {
    for (let i = 1; i <= 4; i++) {
      this.sessionDates.push(moment().add(i, 'days').format('DD/MM/YYYY'));
    }

    this.segmentSessionDates = this.sessionDates[0];
  }

  onChangeSessionDate(event) {
    this.getTheaters(this.cityId);
  }
}
