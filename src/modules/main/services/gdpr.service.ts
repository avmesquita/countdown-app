import { Injectable, OnDestroy } from '@angular/core';
import { eGdpr } from '../enum/e-gdpr.enum';
import { SubSink } from 'subsink';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GdprService implements OnDestroy {

  private subs = new SubSink();

  private dialog: BehaviorSubject<eGdpr> = new BehaviorSubject<eGdpr>(eGdpr.NaoAceito);
  public dialog$ = this.dialog.asObservable();

  constructor(private window: Window) {
    this.load();
   }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private load(): void {
    const cache = localStorage.getItem('GDPR');
    if (cache) {
      this.setGdpr(cache);
    }
  }

  private setGdpr(termos: string): void {
    this.dialog.next(JSON.parse(termos));
    localStorage.setItem('GDPR', JSON.stringify(JSON.parse(termos)));
  }

  public aceito(): void {
    this.dialog.next(eGdpr.Aceito);
    localStorage.setItem('GDPR', JSON.stringify(eGdpr.Aceito));
    const evt = {
      event_category: 'gdpr_approval',
      event_label: 'setQueryDate',
      value: 'Aceito'
    };
    (<any>this.window).gtag('event', 'gdpr_approval', evt);        
  }

  public naoAceito(): void {
    localStorage.clear();
    const evt = {
      event_category: 'gdpr_approval',
      event_label: 'setQueryDate',
      value: 'Não Aceito'
    };
    (<any>this.window).gtag('event', 'gdpr_approval', evt);
    this.window.location.href = 'https://andremesquita.com/';    
  }

}
