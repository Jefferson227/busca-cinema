import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from "ionic-cache";

/**
 * Generic REST Api handler
 */
@Injectable()
export class ApiProvider {
  baseUrl: string;

  constructor(baseUrl: string, public http: HttpClient, public cache: CacheService) {
    this.baseUrl = baseUrl;
  }

  /**
  * This method takes a request configuration object that may have:
  * - HttpParams object     (https://angular.io/api/common/http/HttpParams)
  * - RequestOptions object (https://angular.io/api/http/RequestOptions)
  * - cache: Flag that sets whether the request may be cached or not (https://github.com/Nodonisko/ionic-cache)
  */
  get(endpoint: string, requestConfig: any = {}) {
    let { params, requestOptions, cache } = requestConfig;

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

    const request = this.http.get(this.baseUrl + '/' + endpoint, requestOptions);

    return cache ? this.cache.loadFromObservable(endpoint, request) : request;
  }
}