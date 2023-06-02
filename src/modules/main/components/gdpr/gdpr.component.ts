import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { GdprService } from '../../services/gdpr.service';
import { eGdpr } from '../../enum/e-gdpr.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss']
})
export class GdprComponent implements OnDestroy {

  private dlg?: eGdpr;
  private subs = new SubSink();

  constructor(private gdprService: GdprService,
              private router: Router,
              private window: Window) {
    this.load();
  }

  load(): void {
    this.subs.sink = this.gdprService.dialog$.subscribe( (dlg: any) => {
      this.dlg = dlg;      
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  aceito(e: any): void {
    e.preventDefault();
    console.log('aceito');
    this.gdprService.aceito();
    this.load();
  }

  naoAceito(e: any): void {
    e.preventDefault();    
    this.gdprService.naoAceito();    
  }

  isNaoAceito(): boolean {
    return this.dlg !== eGdpr.Aceito;
  }

}
