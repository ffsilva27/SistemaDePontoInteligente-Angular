import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

export interface loginInfo {
  email: string,
  senha: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly PATH:string = 'auth';

  constructor(private http:HttpClient) { }

  login: loginInfo = {
    email: '',
    senha: ''
  };

  logar(): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, this.login);
  }
}
