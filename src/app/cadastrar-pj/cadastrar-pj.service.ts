import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

export interface cadastroPjInfo {
  id?: string,
  nome: string,
  email: string,
  senha: string,
  cpf: string,
  razaoSocial: string,
  cnpj: string
}

@Injectable({
  providedIn: 'root'
})
export class CadastrarPjService {

  private readonly PATH: string = 'cadastrar-pj';

  constructor(private http: HttpClient) { }

  cadastroPj: cadastroPjInfo = {
    id:'',
    nome:'',
    email:'',
    senha:'',
    cpf:'',
    razaoSocial:'',
    cnpj:''
  };

  cadastrar(): Observable<any> {
    return this.http.post(env.baseApiUrl + this.PATH, this.cadastroPj);
  }


}
