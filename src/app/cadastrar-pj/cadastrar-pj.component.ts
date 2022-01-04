import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastrarPjService } from './cadastrar-pj.service';


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
      cpf: ['', [Validators.required]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required]]
    });
  }

  cadastrarPj(){
    if(this.form.invalid){
      this.snackBar.open("Dados inválidos ou incompletos.", "Erro",{duration:5000});
      return;
    }
    this.cadastroPj.cadastroPj = this.form.value;
    alert(JSON.stringify(this.cadastroPj.cadastroPj));
  };

}
