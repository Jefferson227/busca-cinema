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
    showCityNotFoundMessage: boolean = false;
    showIsNotCanadianCityMessage: boolean = false;
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

    getCityByLocation(long: number, lat: number): void {
      this.apiConnector
        .getCityByLocation(long, lat)
        .subscribe((data: any) => {
          let city: string = this.getCityNameByCoordinates(data);

          if (city) {
            localStorage.setItem('location', city);
            this.city = city;

            if (this.checkIfLocationIsInCanada()) {
              this.loadMovies();
            }
            else {
              this.showLocationModal();
            }
          }
          else {
            this.showLocationModal();
          }
        },
        () => {
          console.error(`Error on getting the location from the api`);
        });
    }

    getCityNameByCoordinates(data: any): string {
      if (data && data.features && data.features.length) {
        return data.features[0].place_name;
      }

      return '';
    }

    getLocation(): void {
      let city: string = localStorage.getItem('location');

      if (city) {
        if (this.checkIfLocationIsInCanada()) {
          this.city = city;
          this.loadMovies();
        }
        else {
          this.showLocationModal();
        }
      }
      else {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.getCityByLocation(resp.coords.longitude, resp.coords.latitude);
        }).catch((error) => {
          this.showLocationModal();
          console.error('Error on getting location', error);
        });
      }
    }

    goToDetail(movie) {
      console.log(`Movie ${movie.id} clicked`);
      this.navCtrl.push(MovieDetailPage, {
        movieName: movie.name,
        movieId: movie.id,
        movieImg: movie.img
      });
    }

    showLocationModal(): void {
      let locationModal = this.modalCtrl.create(LocationPage);

      locationModal.onDidDismiss((data: any) => {
        let storedCity = localStorage.getItem('location');

        if (storedCity) {
          if (this.checkIfLocationIsInCanada()) {
            this.showErrorMessage = false;
            this.showCityNotFoundMessage = false;
            this.showIsNotCanadianCityMessage = false;

            this.city = storedCity;
            this.loadMovies();
          }
          else {
            this.showErrorMessage = true;
            this.showCityNotFoundMessage = false;
            this.showIsNotCanadianCityMessage = true;

            this.city = '';
            this.loadingProvider.hide(this.loading);
          }
        }
        else {
          this.showErrorMessage = true;
          this.showCityNotFoundMessage = true;
          this.showIsNotCanadianCityMessage = false;

          this.city = '';
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

    checkIfLocationIsInCanada(): boolean {
      let location = localStorage.getItem('location');

      if (location) {
        let country = location
                        .split(',')[2]
                        .trim()
                        .toLocaleLowerCase();

        if (country === 'canada') {
          return true;
        }
      }

      return false;
    }
}