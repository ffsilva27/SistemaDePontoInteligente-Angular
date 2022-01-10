import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { lancamentoInfo, LancamentoService } from 'src/app/shared/services/lancamento.service';
import { duration } from 'moment';
import { LancamentoComponent } from '../lancamento/lancamento.component';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<lancamentoInfo>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'geoLocalizacao'];

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  constructor(private lancamentoService: LancamentoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.lancamentoService.listarTodosLancamentos().subscribe(data => {
      const lancamentos = data['data'] as lancamentoInfo[];
      this.dataSource = new MatTableDataSource<lancamentoInfo>(lancamentos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.matPaginator;
    },
    err => {
      const msg: string = "Erro obtendo lancamentos!";
      this.snackBar.open(msg, "Erro", {duration: 5000});
    });
  }

  obterUrlMapa(localizacao:string){
    return "https://www.google.com/maps/search/?api=1&query=" + localizacao;
  }
}
