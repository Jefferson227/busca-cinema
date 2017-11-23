import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
import { LoadingProvider } from '../../providers/loading/loading';
import { MovieDetailPage } from "../movie-detail/movie-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // MOCK DATA FOR TESTING PURPOSES
  movies: any[];
  loading: any;

  constructor(public navCtrl: NavController, public apiConnector: ApiConnectorProvider, public loadingProvider: LoadingProvider) {
    this.loading = this.loadingProvider.initialize();
    this.loadingProvider.show(this.loading);
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