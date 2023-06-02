import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { ServiceWorkerModule } from '@angular/service-worker';

//import { WINDOW_PROVIDERS } from './factory/window-token.factory';
import { ContagemRegressivaComponent } from './components/contagem-regressiva/contagem-regressiva.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    ContagemRegressivaComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [ 
    //WINDOW_PROVIDERS     
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
