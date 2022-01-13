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
import { FuncionarioService } from 'src/app/shared/services/funcionario.service';

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

  funcionarios: funcionarioInfo[];
  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(private lancamentoService: LancamentoService, private httpUtil: HttpUtilService, private snackBar: MatSnackBar, private fb: FormBuilder, private funcionarioService: FuncionarioService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterFuncionarios();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    })
  }

  get funcId() {
    return sessionStorage.getItem('funcionarioId') || false;
  }

  obterFuncionarios(){
    this.funcionarioService.listaFuncionarioPorEmpresa().subscribe(data=>{
      const usuarioId:string = this.httpUtil.obterIdUsuario();
      this.funcionarios = data.data.filter(func => func.id != usuarioId);

      if(this.funcId) {
        this.form.get('funcs').setValue(parseInt(this.funcId,10));
        this.exibirLancamentos();
      }
    },
    err => {
      const msg:string = "Erro obtendo funcionários.";
      this.snackBar.open(msg, "Erro", {duration: 5000});
    }
    )
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  exibirLancamentos(){
    if(this.matSelect.selected){
      this.funcionarioId = this.matSelect.selected['value'];
    }else if(this.funcId){
      this.funcionarioId = this.funcId;
    }else {
      return;
    }
    sessionStorage.setItem('funcionarioId',this.funcionarioId);

    this.lancamentoService.listarLancamentoPorFuncionario(this.funcionarioId, this.pagina, this.ordem, this.direcao).subscribe(data => {
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

  removerDialog(lancamentoId: string){
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe(remover=>{
      if(remover){
        this.remover(lancamentoId);
      }
    })
  }

  remover(lancamentoId: string) {
    this.lancamentoService.remover(lancamentoId).subscribe(data=>{
      const msg:string = 'Lançamento removido com sucesso.';
      this.snackBar.open(msg, "Sucesso",{duration:5000});
      this.exibirLancamentos();
    },
    err=>{
      let msg:string = 'Tente novamente em instantes.';
      if(err.status === 400){
        msg = err.error.errors.join(' ');
      }
      this.snackBar.open(msg,"Erro",{duration:5000});
    }
    )
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

@Component({
  selector: 'confirmar-dialog',
  template: `
  <h1 mat-dialog-title>Deseja realmente cancelar o lançamento?</h1>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
    <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
  </div>
  `
})
export class ConfirmarDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
}
