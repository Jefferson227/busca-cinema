import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { ApiConnectorProvider } from '../providers/api-connector/api-connector';
import { HttpModule } from '@angular/http';
import { ComponentsModule } from "../components/components.module";
import { LoadingProvider } from '../providers/loading/loading';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MovieDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MovieDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiConnectorProvider,
    LoadingProvider
  ]
})
export class AppModule {}
