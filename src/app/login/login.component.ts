import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder , private snackBar: MatSnackBar , private router: Router , private login: LoginService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  logar(){
    if(this.form.invalid){
      this.snackBar.open("Dados inválidos ou incompletos!", "Erro", {duration: 5000});
      return;
    }
    this.login.login = this.form.value;
    this.login.logar().subscribe(data=>{
      localStorage.setItem('token', data.data.token);
      //O comando 'atob' serve para decodificar o token que esta em Base64.
      const usuarioData = JSON.parse(atob(data.data.token.split('.')[1]));
      if(usuarioData.role=='ROLE_ADMIN'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/funcionario']);
      }
    },
    err=> {
      console.log(JSON.stringify(err));
      let msg: string = "Tente novamente em instantes";
      if(err.status==401){
        msg = "Email/senha inválido(s)."
      }
      this.snackBar.open(msg,"Erro",{duration:5000});
    }
    );
  }
}
