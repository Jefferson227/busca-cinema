import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';
// import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  txtCity: string;
  cities: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiConnector: ApiConnectorProvider
  ) {
  }

  getCitiesByName() {
    this.apiConnector
      .getCitiesByName(this.txtCity)
      .subscribe((cities: any) => {
        this.cities = this.extractCityNames(cities);
      });
  }

  extractCityNames(cities) {
    let citiesFullName = [];

    cities.results.forEach((city) => {
        let cityName = city.address_components.map((i) => {
            if (i.types.includes('locality')) {
                return i;
            }
        })
        .filter((f) => f !== undefined)[0];

        let state = city.address_components.map((i) => {
            if (i.types.includes('administrative_area_level_1')) {
                return i;
            }
        })
        .filter((f) => f !== undefined)[0];

        let country = city.address_components.map((i) => {
            if (i.types.includes('country')) {
                return i;
            }
        })
        .filter((f) => f !== undefined)[0];

        cityName = cityName !== undefined ? cityName.long_name : '';
        state = state !== undefined ? state.long_name : '';
        country = country !== undefined ? country.long_name : '';

        citiesFullName.push(`${cityName}, ${state} - ${country}`);
    });

    return citiesFullName;
  }

  selectCity(city): void {
    localStorage.setItem('location', city);
    this.viewCtrl.dismiss();
    console.log(city);
  }
}
