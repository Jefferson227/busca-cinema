import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
import moment from 'moment';
import { LoadingProvider } from '../../providers/loading/loading';

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
  cityId;
  segmentSessionDates;
  movieDetailsByTheater = [];
  theaters              = [];
  sessionDates          = [];
  noSessionsMessage     = '';
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiConnector: ApiConnectorProvider, public loadingProvider: LoadingProvider) {
    this.loading = this.loadingProvider.initialize();
    this.loadingProvider.show(this.loading);

    this.movie  = navParams.data.movie;
    this.cityId = navParams.data.cityId;
    this.getSessionDates();
    this.getTheatersByMovie();
  }

  buyTickets() {
    alert('era pra abrir a url' + this.movie.siteURL);
  }

  getTheatersByMovie() {
    let date            = moment(this.segmentSessionDates, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let t               = this;
    t.theaters          = [];
    t.noSessionsMessage = '';

    this.apiConnector
      .getTheatersByMovie(t.cityId, t.movie.id, date)
      .subscribe(
        (data) => {
          if (data && data.length > 0) {
            t.theaters = data[0].theaters;
          } else {
            t.noSessionsMessage = 'Não há sessões disponíveis para esta data.';
          }
        },
        (error) => {
          console.error('Error on getting theater by movie.');
        },
        () => {
          this.loadingProvider.hide(this.loading);
        }
      );
  }

  getSessionDates() {
    for (let i = 0; i < 4; i++) {
      this.sessionDates.push(moment().add(i, 'days').format('DD/MM/YYYY'));
    }

    this.segmentSessionDates = this.sessionDates[0];
  }

  onChangeSessionDate(event) {
    this.loading = this.loadingProvider.initialize();
    this.loadingProvider.show(this.loading);
    this.getTheatersByMovie();
  }
}
