import { Component } from '@angular/core';
import { ContagemRegressivaService } from '../../services/contagem-regressiva.service';

@Component({
  selector: 'app-contagem-regressiva',
  templateUrl: './contagem-regressiva.component.html',
  styleUrls: ['./contagem-regressiva.component.scss']
})
export class ContagemRegressivaComponent {
  constructor(public service: ContagemRegressivaService) {  }
}
