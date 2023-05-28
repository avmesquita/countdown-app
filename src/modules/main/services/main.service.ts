import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  applicationTitle: string = '';

  constructor() {
    this.applicationTitle = 'solid-frontend-base-angular-modular';
   }

}
