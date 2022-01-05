import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastrarPjService } from './cadastrar-pj.service';
import { CpfValidator } from '../shared/validators/cpf.validator';
import { CnpjValidator } from '../shared/validators/cnpj.validator';


@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.scss']
})
export class CadastrarPjComponent implements OnInit {
  form: FormGroup;
  constructor(private fb:FormBuilder, private router:Router, private snackBar: MatSnackBar, private cadastroPj: CadastrarPjService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required, CnpjValidator]]
    });
  }

  cadastrarPj(){
    if(this.form.invalid){
      this.snackBar.open("Dados inválidos ou incompletos!", "Erro",{duration:5000});
      return;
    }
    this.cadastroPj.cadastroPj = this.form.value;
    this.cadastroPj.cadastrar().subscribe(data => {
      const msg:string = "Cadastro efetuado com sucesso! Realize o login para acessar o sistema.";
      this.snackBar.open(msg,"Sucesso",{duration: 5000});
      this.router.navigate(['/login']);
    },
      err => {
        let msg: string = "Tente novamente em instantes."
        if(err.status == 400) {
          msg = err.error.errors.join(' ');
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      }
    );
      return false;
  };

}
