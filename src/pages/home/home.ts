import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
import { LoadingProvider } from '../../providers/loading/loading';
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // MOCK DATA FOR TESTING PURPOSES
  movies: any[];
  loading: any;

  constructor(public navCtrl: NavController, public apiConnector: ApiConnectorProvider, public loadingProvider: LoadingProvider, private geolocation: Geolocation) {
    this.loading = this.loadingProvider.initialize();
    this.loadingProvider.show(this.loading);
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    this.loadMovies();
  }

  loadMovies() {
    this.apiConnector
        .getMovies()
        .subscribe((data: any) => {
          this.movies = data;
          this.loadingProvider.hide(this.loading);
        });
  }

  goToDetail(movieId) {
    console.log(`Movie ${movieId} clicked`);
    return;
    // this.apiConnector
    //   .getMovieDetail(movieId)
    //   .subscribe(data => {
    //     let objParams = {
    //       cityId: this.cityId,
    //       movie: data
    //     };

    //     this.navCtrl.push(MovieDetailPage, objParams);
    //   });
  }
}