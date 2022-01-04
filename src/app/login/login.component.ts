import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimationDurations } from '@angular/material/core';
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
      this.snackBar.open("Favor informar os dados ou preencher com dados válidos!", "Erro", {duration: 5000});
      return;
    }
    this.login.login = this.form.value;
    this.login.logar().subscribe(data=>{
      console.log(JSON.stringify(data))
    });
  }
}
