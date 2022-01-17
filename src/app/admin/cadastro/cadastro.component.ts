import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { lancamentoInfo, LancamentoService } from 'src/app/shared/services/lancamento.service';
import { Tipo } from 'src/app/shared/tipo.enum';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  title:string = "Controle de ponto - Admin";
  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[]

  constructor(private fb: FormBuilder, private route:ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.gerarForm();
    this.horas = this.gerarListaNumeros(0,23);
    this.minutos = this.gerarListaNumeros(0,59);
    this.tipos = [Tipo.INICIO_ALMOCO, Tipo.INICIO_TRABALHO, Tipo.TERMINO_ALMOCO, Tipo.TERMINO_TRABALHO];
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['',[Validators.required]],
      tipo: ['',[Validators.required]],
      horas: ['',[Validators.required]],
      minutos: ['',[Validators.required]]
    })
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = Array();
    for(let i = inicio; i <= termino; i++){
      let numero: string = i.toString();
      if(i<10){
        numero = '0' + numero;
      }
      numeros.push(numero);
    }
    return numeros;
  }

  cadastrar() {
    if(this.form.invalid){
      return;
    }

    const dados = this.form.value;

    this.obterLancamento(dados);

    this.lancamentoService.cadastrar().subscribe(data=>{
      const msg: string = "Lançamento cadastrado com sucesso!";
      this.snackBar.open(msg, "Sucesso", {duration: 5000});
      this.router.navigate(['/admin']);
    },
    err=>{
      let msg: string = "Tente novamente em instantes.";
      if(err.status == 400) {
        msg = err.error.errors.join(' ');
      }
      this.snackBar.open(msg, "Erro", {duration:5000});
    }
    )
  }

  obterLancamento(dados:any){
    const data = moment(dados.data);
    data.set({
      hour: dados.horas,
      minute: dados.minutos,
      second: 0
    });
    this.lancamentoService.lancamento = {
      data: data.format('YYYY-MM-DD HH:mm:ss'),
      tipo: dados.tipo,
      localizacao: '',
      funcionarioId: this.funcionarioId
    }
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'];
  }

}
