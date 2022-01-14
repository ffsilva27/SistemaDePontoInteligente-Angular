import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.scss']
})
export class AtualizacaoComponent implements OnInit {
  title:string = "Controle de ponto - Admin";

  constructor() { }

  ngOnInit(): void {
  }

}
