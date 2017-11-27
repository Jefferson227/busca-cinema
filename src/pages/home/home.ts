import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
import { LoadingProvider } from '../../providers/loading/loading';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationPage } from "../location/location";
import { MovieDetailPage } from '../movie-detail/movie-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    movies: any[];
    loading: any;
    city: string;
    showErrorMessage: boolean = false;
    segmentSessionDates: any[];
    sessionDates: any[];

    constructor(public navCtrl: NavController,
        public apiConnector: ApiConnectorProvider,
        public loadingProvider: LoadingProvider,
        private geolocation: Geolocation,
        private modalCtrl: ModalController
      ) {
      this.sessionDates = [];
      this.loading = this.loadingProvider.initialize();
      this.loadingProvider.show(this.loading);
      this.getLocation();
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
            this.loadMovies();
          }
          else {
            this.showLocationModal();
          }
        },
        () => {
          console.error(`Error on getting the location from the api`);
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
        this.loadMovies();
      }
      else {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.getCityByLocation(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
          this.showLocationModal();
          console.error('Error on getting location', error);
        });
      }
    }

    goToDetail(movie) {
      console.log(`Movie ${movie.id} clicked`);
      this.navCtrl.push(MovieDetailPage, {
        movieId: movie.id,
        movieImg: movie.img
      });
    }

    showLocationModal(): void {
      let locationModal = this.modalCtrl.create(LocationPage);

      locationModal.onDidDismiss((data: any) => {
        let storedCity = localStorage.getItem('location');

        if (storedCity) {
          this.showErrorMessage = false;
          this.city = storedCity;
          this.loadMovies();
        }
        else {
          this.city = '';
          this.showErrorMessage = true;
          this.loadingProvider.hide(this.loading);
        }
      });

      locationModal.present();
    }

    getSessionDates(moment: any) {
      for (let i = 0; i < 4; i++) {
        this.sessionDates.push(moment.add(i, 'days').format('DD/MM/YYYY'));
      }

      this.segmentSessionDates = this.sessionDates[0];
    }
}