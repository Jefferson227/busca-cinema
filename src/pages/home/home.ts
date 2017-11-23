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
  cityId = 36;
  movies;
  loading;

  constructor(public navCtrl: NavController, public apiConnector: ApiConnectorProvider, public loadingProvider: LoadingProvider) {
    // this.loading = this.loadingProvider.initialize();
    // this.loadingProvider.show(this.loading);
    // this.loadMovies();
  }

  // loadMovies() {
  //   this.apiConnector
  //       .getMovies(this.cityId)
  //       .subscribe((data: any) => {
  //         this.movies = data.items;
  //         this.loadingProvider.hide(this.loading);
  //       });
  // }

  // goToDetail(movieId) {
  //   this.apiConnector
  //     .getMovieDetail(movieId)
  //     .subscribe(data => {
  //       let objParams = {
  //         cityId: this.cityId,
  //         movie: data
  //       };

  //       this.navCtrl.push(MovieDetailPage, objParams);
  //     });
  // }
}