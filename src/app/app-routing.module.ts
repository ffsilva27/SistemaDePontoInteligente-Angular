import { AtualizacaoComponent } from './admin/atualizacao/atualizacao.component';
import { CadastroComponent } from './admin/cadastro/cadastro.component';
import { ListagemAdminComponent } from './admin/listagem-admin/listagem-admin.component';
import { CadastrarPjComponent } from './cadastrar-pj/cadastrar-pj.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastrarPfComponent } from './cadastrar-pf/cadastrar-pf.component';
import { ListagemComponent } from './funcionario/listagem/listagem.component';
import { LancamentoComponent } from './funcionario/lancamento/lancamento.component';
import { AdminGuard } from './shared/services/admin-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: "login", component: LoginComponent},
  {path:"cadastro-pj", component: CadastrarPjComponent},
  {path:"cadastro-pf", component: CadastrarPfComponent},
  {path:"funcionario", component: LancamentoComponent},
  {path:"funcionario/listagem", component: ListagemComponent},
  {path:"admin", component: ListagemAdminComponent, canActivate:[AdminGuard]},
  {path:"admin/cadastro", component: CadastroComponent, canActivate:[AdminGuard]},
  {path:"admin/atualizacao/:lancamentoId", component: AtualizacaoComponent, canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
