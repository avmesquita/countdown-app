import { Injectable, enableProdMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  applicationTitle: string = '';

  constructor() {
    this.applicationTitle = 'Contagem Regressiva';
  }

  productionMode(): void {    
    enableProdMode();
  }


}
