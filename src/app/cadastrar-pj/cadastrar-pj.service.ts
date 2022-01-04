import { Injectable } from '@angular/core';

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

  constructor() { }

  cadastroPj: cadastroPjInfo = {
    id:'',
    nome:'',
    email:'',
    senha:'',
    cpf:'',
    razaoSocial:'',
    cnpj:''
  };

}
