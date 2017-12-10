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
  movieName: string;
  movieId: number;
  movieImg: string;
  movieInfo: any;
  showMovieLoader: boolean = true;
  showMovieInfoLoader: boolean = true;
  hasErrorOnLoadMovieInfo: boolean = false;
  sessions: any[];
  image: string;
  city: string;
  segmentSessionDates: any[];
  sessionDates: any[];
  loading: any;
  showtime: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiConnector: ApiConnectorProvider
  ) {
    this.sessionDates = [];
    this.showtime = {};
    this.movieInfo = {};
    this.sessions = [];
    this.movieName = navParams.data.movieName;
    this.movieId = navParams.data.movieId;
    this.movieImg = navParams.data.movieImg;
    this.city = localStorage.getItem('location');
    this.getSessionDates();
    this.getTheatersByMovie();
    this.getMovieInfo();
  }

  getMovieInfo(): void {
    this.apiConnector
      .getMovieInfo(this.movieName)
        .subscribe((info) => {
          this.movieInfo = info;
        },
        (error) => {
          console.error('Error on getting theater by movie.');
        },
        () => {
          this.showMovieInfoLoader = false;
        });
  }

  getTheatersByMovie() {
    let date = moment(this.segmentSessionDates, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let cityName = this.city.split(',')[0]
                    .trim()
                    .toLowerCase();

    this.apiConnector
      .getTheatersByMovie(cityName, this.movieId, date)
      .subscribe(
        (data: any) => {
          if (data.sessions && data.sessions.length) {
            this.sessions = data.sessions;
          }
        },
        (error) => {
          console.error('Error on getting theaters from the movie.');
        },
        () => {
          this.showMovieLoader = false;
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
    this.showMovieLoader = true;
    this.getTheatersByMovie();
  }
}
