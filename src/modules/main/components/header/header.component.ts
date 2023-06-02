import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { eTheme } from '../../enum/etheme.enum';
import { ThemeService } from '../../services/theme.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  
  @Input('theme') theme?: eTheme;
  
  private subs = new SubSink();

  constructor(private themeService: ThemeService) {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('TEMA SELECIONADO EM HEADER AfterViewInit = ', this.theme);
  }
  
  changeTheme(event: any): void {    
    event.stopPropagation();
    if (this.theme === eTheme.Light) {
      this.themeService.changeTheme(eTheme.Dark);
    } else {
      this.themeService.changeTheme(eTheme.Light);
    }
    this.subs.sink = this.themeService.theme$.subscribe( (theme: any) => {
      this.theme = theme;
      console.log('TEMA SELECIONADO EM HEADER changeTheme = ', this.theme);      
    });    
  }

}
