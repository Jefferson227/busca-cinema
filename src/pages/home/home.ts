import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
import { FAKE_MOVIE_DATA } from "./fakemovie.data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // MOCK DATA FOR TESTING PURPOSES
  ceara     = [{ "id": "36", "name": "Fortaleza", "uf": "CE", "state": "Ceará", "urlKey": "fortaleza", "timeZone": "America/Fortaleza" }, { "id": "450", "name": "Juazeiro do Norte", "uf": "CE", "state": "Ceará", "urlKey": "juazeiro-do-norte", "timeZone": "America/Fortaleza" }, { "id": "312", "name": "Maracanaú", "uf": "CE", "state": "Ceará", "urlKey": "maracanau", "timeZone": "America/Fortaleza" }, { "id": "455", "name": "Maranguape", "uf": "CE", "state": "Ceará", "urlKey": "maranguape", "timeZone": "America/Sao_Paulo" }];
  fortaleza = { "id": "36", "name": "Fortaleza", "uf": "CE", "state": "Ceará", "urlKey": "fortaleza", "timeZone": "America/Fortaleza" };
  theater   = 1256;

  movies = FAKE_MOVIE_DATA;

  states;

  constructor(public navCtrl: NavController, public apiConnector: ApiConnectorProvider) {
    // this.loadStatesData();
    this.loadMovies();
  }

  loadMovies() {
    this.apiConnector
        .getMovies(this.fortaleza.id, this.theater)
        .subscribe(data => {
          this.movies = data[0].movies;
        });
  }

  loadStatesData() {
    this.apiConnector
        .loadStates()
        .subscribe(data => this.states = data);
  }
}