import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { HttpUtilService } from './http-util.service';
import { lancamentoInfo } from './lancamento.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly PATH: string = 'funcionarios';
  private readonly PATH_FUNC_POR_EMPRESA = '/empresa/{empresaId}';

  constructor(private httpUtil: HttpUtilService, private http: HttpClient) { }

  listaFuncionarioPorEmpresa(): Observable<any>{
    return this.http.get(env.baseApiUrl + this.PATH + this.PATH_FUNC_POR_EMPRESA.replace('{empresaId}', this.httpUtil.obterIdEmpresa()), this.httpUtil.headers());
  }
}
