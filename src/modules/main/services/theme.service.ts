import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { eTheme } from '../enum/etheme.enum';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {

  private subs = new SubSink();

  private theme: BehaviorSubject<eTheme> = new BehaviorSubject<eTheme>(eTheme.Light);
  public theme$ = this.theme.asObservable();

  constructor() { 
    this.loadThemeFromLocalStorage();
  }

  ngOnDestroy(): void {
      //console.log('unsubscribe occurs');
      try {
        this.subs.unsubscribe();
      } catch (error) {
        console.log('unsubscribe error => ', error);
      }          
  }

  private loadThemeFromLocalStorage(): void {
    try {
      const cache = localStorage.getItem('theme');
      if (cache) {
        this.theme.next(JSON.parse(cache));
      } else {
        this.setTheme(eTheme.Light);
      }
    } catch (error) {
      console.log('loadThemeFromLocalStorage error => ', error);      
    }
  }

  private setTheme(theme: eTheme): void {
    try {
      this.theme.next(theme);
      localStorage.setItem('theme',JSON.stringify(theme));
      this.setThemeToBodyElement(theme);
    } catch (error) {
      console.log('setTheme error => ', error);
    }
  }

  public changeTheme(theme: eTheme): void {
      this.setTheme(theme);
  };

  private setThemeToBodyElement(theme: eTheme): void {
    try {
      const body = window.document.getElementById('main-theme');
      if (body && theme === eTheme.Dark) {
        body.style.backgroundColor = 'black';
      } else
      if (body && theme === eTheme.Light) {    
        body.style.backgroundColor = 'white';
      }
    } catch (error) {
      console.log('setThemeToBodyElement error => ', error);
    }    
  }  

}
