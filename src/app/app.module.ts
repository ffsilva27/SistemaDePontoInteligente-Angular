import { MatPaginatorIntl } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CadastrarPjComponent } from './cadastrar-pj/cadastrar-pj.component';
import { MascaraDirective } from './shared/mascara.directive';
import { CadastrarPfComponent } from './cadastrar-pf/cadastrar-pf.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListagemComponent } from './funcionario/listagem/listagem.component';
import { LancamentoComponent } from './funcionario/lancamento/lancamento.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { TradutorPaginator } from './shared/tradutor-paginator';
import { TipoPipe } from './shared/tipo.pipe';
import { DataPipe } from './shared/data.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarPjComponent,
    MascaraDirective,
    CadastrarPfComponent,
    ListagemComponent,
    LancamentoComponent,
    TipoPipe,
    DataPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule

  ],
  providers: [{provide: MatPaginatorIntl, useClass: TradutorPaginator}],
  bootstrap: [AppComponent]
})
export class AppModule { }
