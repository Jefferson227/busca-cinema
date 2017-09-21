import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.movie = navParams.data;
    debugger
  }

  buyTickets() {
    alert('era pra abrir a url' + this.movie.siteURL);
  }
}
