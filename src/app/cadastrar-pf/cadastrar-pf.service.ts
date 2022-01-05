import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

export interface cadastroPfInfo {
  id?: string,
  nome: string,
  email: string,
  senha: string,
  cpf: string,
  cnpj: string
}

@Injectable({
  providedIn: 'root'
})
export class CadastrarPfService {

  private readonly PATH: string = "cadastrar-pf";

  constructor(private httpClient: HttpClient) { }

  cadastroPf: cadastroPfInfo = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    cnpj: ''
  }

  cadastro(): Observable<any>{
    return this.httpClient.post(env.baseApiUrl+this.PATH, this.cadastroPf);
  }
}
