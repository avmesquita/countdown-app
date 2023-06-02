import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ContagemRegressivaComponent } from './components/contagem-regressiva/contagem-regressiva.component';
import { GdprComponent } from './components/gdpr/gdpr.component';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    ContagemRegressivaComponent,
    GdprComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    HttpClientModule,    
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [ 
    { provide: Window, useValue: window } 
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
