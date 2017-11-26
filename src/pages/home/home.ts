import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
import { LoadingProvider } from '../../providers/loading/loading';
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { Geolocation } from '@ionic-native/geolocation';
import { LocationPage } from "../location/location";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    movies: any[];
    loading: any;
    city: string;

    constructor(public navCtrl: NavController,
        public apiConnector: ApiConnectorProvider,
        public loadingProvider: LoadingProvider,
        private geolocation: Geolocation,
        private modalCtrl: ModalController
      ) {
      this.loading = this.loadingProvider.initialize();
      this.loadingProvider.show(this.loading);
      this.getLocation();
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

    getCityByLocation(lat: number, long: number): void {
      this.apiConnector
        .getCityByLocation(lat, long)
        .subscribe((position: any) => {
          let city: string = this.getCityNameByCoordinates(position);

          if (city) {
            localStorage.setItem('location', city);
            this.city = city;
          }
          else {
            this.modalCtrl.create(LocationPage).present();
          }
        });
    }

    getCityNameByCoordinates(position): string {
      if (position.results.length) {

        let firstPosition = position.results[0];

        let cityName = firstPosition.address_components.map((i) => {
            if (i.types.includes('locality')) {
                return i;
            }
        })
        .filter((f) => f !== undefined)[0].long_name;

        let state = firstPosition.address_components.map((i) => {
            if (i.types.includes('administrative_area_level_1')) {
                return i;
            }
        })
        .filter((f) => f !== undefined)[0].long_name;

        let country = firstPosition.address_components.map((i) => {
            if (i.types.includes('country')) {
                return i;
            }
        })
        .filter((f) => f !== undefined)[0].long_name;

        return `${cityName}, ${state} - ${country}`;
      }

      return '';
    }

    getLocation(): void {
      let city: string = localStorage.getItem('location');

      if (city) {
        this.city = city;
      }
      else {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.getCityByLocation(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
          this.modalCtrl.create(LocationPage).present();
          console.error('Error on getting location', error);
        });
      }
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