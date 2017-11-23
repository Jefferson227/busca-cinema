import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CacheModule } from "ionic-cache";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { ApiConnectorProvider } from '../providers/api-connector/api-connector';
import { ComponentsModule } from "../components/components.module";
import { LoadingProvider } from '../providers/loading/loading';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MovieDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot(),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MovieDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiConnectorProvider,
    LoadingProvider,
    ApiProvider,
  ]
})
export class AppModule {}
