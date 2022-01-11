import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { LancamentoService, lancamentoInfo, funcionarioInfo } from 'src/app/shared/services/lancamento.service';
import { Tipo } from 'src/app/shared/tipo.enum';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';

@Component({
  selector: 'app-listagem-admin',
  templateUrl: './listagem-admin.component.html',
  styleUrls: ['./listagem-admin.component.scss']
})
export class ListagemAdminComponent implements OnInit {

  dataSource: MatTableDataSource<lancamentoInfo>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'geoLocalizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(private lancamentoService: LancamentoService, private httpUtil: HttpUtilService, private snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.exibirLancamentos();
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  exibirLancamentos(){
    this.funcionarioId = '3';

    this.lancamentoService.listarLancamentoPorFuncionario(this.funcionarioId, this.pagina, this.ordem, this.direcao).subscribe(data => {
      console.log(data);
      this.totalLancamentos = data.data.totalElements;
      const lancamentos: lancamentoInfo[] = data.data.content;
      this.dataSource = new MatTableDataSource<lancamentoInfo>(lancamentos);
    },
    err=> {
      const msg: string = "Erro obtendo lançamento.";
      this.snackBar.open(msg, "Erro", {duration: 5000});
    }
    );
  }

  remover(lancamentoId: string) {
    alert(lancamentoId);
  }

  paginar(pageEvent: PageEvent){
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort:Sort){
    if(sort.direction == '') {
      this.ordemPadrao();
    }else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }

  obterUrlMapa(localizacao:string){
    return "https://www.google.com/maps/search/?api=1&query=" + localizacao;
  }

}
