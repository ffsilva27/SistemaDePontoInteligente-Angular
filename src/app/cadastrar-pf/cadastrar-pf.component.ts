import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CpfValidator } from '../shared/validators/cpf.validator';
import { CnpjValidator } from '../shared/validators/cnpj.validator';
import { CadastrarPfService } from './cadastrar-pf.service';

@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.scss']
})
export class CadastrarPfComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router:Router, private cadastroPf: CadastrarPfService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      cnpj: ['', [Validators.required, CnpjValidator]]
    })
  }

  cadastrarPf(){
    if(this.form.invalid){
      this.snackBar.open("Dados inválidos ou incompletos!", "Error", {duration: 5000});
      return;
    }
    this.cadastroPf.cadastroPf = this.form.value;
    this.cadastroPf.cadastro().subscribe(data => {
      console.log(data);
      const msg: string = "Cadastro efetuado com sucesso! Realize o login para acessar o sistema.";
      this.snackBar.open(msg, "Sucesso", {duration:5000});
      this.router.navigate(['/login']);
    },
    err => {
      console.log(err);
      let msg: string = "Tente novamente em instantes."
      if(err.status == 400) {
        msg = err.error.errors.join(' ');
      }
      this.snackBar.open(msg, "Erro", {duration: 5000});
    }
    );
    return false;
  }

}
