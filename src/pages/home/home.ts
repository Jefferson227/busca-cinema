import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
import { MovieDetailPage } from "../movie-detail/movie-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // MOCK DATA FOR TESTING PURPOSES
  cityId = 36;
  movies;
  states;

  constructor(public navCtrl: NavController, public apiConnector: ApiConnectorProvider) {
    this.loadMovies();
  }

  loadMovies() {
    this.apiConnector
        .getMovies(this.cityId)
        .subscribe(data => {
          this.movies = data.items;
        });
  }

  loadStatesData() {
    this.apiConnector
        .loadStates()
        .subscribe(data => this.states = data);
  }

  goToDetail(movie) {
    this.navCtrl.push(MovieDetailPage, movie);
  }
}