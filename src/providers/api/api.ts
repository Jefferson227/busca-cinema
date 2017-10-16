import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Generic REST Api handler
 */
@Injectable()
export class ApiProvider {
  baseUrl: string;

  constructor(public http: HttpClient, baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get(endpoint: string, params?: any, requestOptions?: any) {
    if (!requestOptions) {
      requestOptions = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      requestOptions.params = new HttpParams();
      for (let k in params) {
        requestOptions.params.set(k, params[k]);
      }
    }

    return this.http.get(this.baseUrl + '/' + endpoint, requestOptions);
  }
}