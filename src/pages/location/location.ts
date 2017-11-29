import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiConnectorProvider } from '../../providers/api-connector/api-connector';

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
  timeout: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiConnector: ApiConnectorProvider,
    private viewCtrl: ViewController
  ) {
  }

  getCitiesByName() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (this.txtCity) {
        this.apiConnector
          .getCitiesByName(this.txtCity)
          .subscribe((cities: any) => {
            this.cities = this.extractCityNames(cities);
          });
      }
      else {
        this.cities = [];
      }
    }, 500);
  }

  extractCityNames(cities) {
    if (cities && cities.features && cities.features.length) {
      return cities.features.map((feature) => {
        return feature.place_name;
      });
    }

    return [];
  }

  selectCity(city): void {
    localStorage.setItem('location', city);
    this.viewCtrl.dismiss();
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
