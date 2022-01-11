import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { HttpUtilService } from './http-util.service';

export interface lancamentoInfo {
  data:string,
  tipo:string,
  localizacao:string,
  funcionarioId:string,
  id?:string
}

export interface funcionarioInfo {
  nome: string,
  email: string,
  cpf: string,
  perfil: string,
  valorHora?: string,
  qtdHorasTrabalhoDia?: string,
  qtdHorasAlmoco?: string,
  lancamentos?: lancamentoInfo[],
  id?: string
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private readonly PATH:string = 'lancamentos';
  private readonly PATH_ULTIMO_LANC = '/funcionario/{funcionarioId}/ultimo';
  private readonly PATH_LANCAMENTOS = '/funcionario/{funcionarioId}';
  private readonly PATH_TODOS_LANC = '/funcionario/{funcionarioId}/todos'

  constructor(private http: HttpClient, private httpUtil:HttpUtilService) { }

  lancamento: lancamentoInfo = {
    data: '',
    tipo:'',
    localizacao:'',
    funcionarioId:'',
    id:''
  }

  funcionario: funcionarioInfo = {
    nome: '',
    email: '',
    cpf: '',
    perfil: '',
    valorHora: '',
    qtdHorasTrabalhoDia: '',
    qtdHorasAlmoco: '',
    lancamentos: [],
    id: ''
  }

  buscarUltimoTipoLancado(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + this.PATH_ULTIMO_LANC.replace('{funcionarioId}', this.httpUtil.obterIdUsuario()), this.httpUtil.headers()
    );
  }

  cadastrar(): Observable<any>{
    return this.http.post(env.baseApiUrl + this.PATH, this.lancamento, this.httpUtil.headers());
  }

  listarTodosLancamentos(): Observable<any>{
    return this.http.get(env.baseApiUrl + this.PATH + this.PATH_TODOS_LANC.replace('{funcionarioId}', this.httpUtil.obterIdUsuario()), this.httpUtil.headers());
  }

  listarLancamentoPorFuncionario(funcionarioId:string, pagina: number, ordem: string, direcao: string): Observable<any> {
    const url: string = env.baseApiUrl + this.PATH + this.PATH_LANCAMENTOS.replace('{funcionarioId}', funcionarioId);

    const params: string = '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;

    return this.http.get(url + params, this.httpUtil.headers());
  }
}
