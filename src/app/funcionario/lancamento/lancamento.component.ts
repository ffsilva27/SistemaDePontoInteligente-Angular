import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tipo } from 'src/app/shared/tipo.enum';
import { LancamentoService, lancamentoInfo } from 'src/app/shared/services/lancamento.service';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import  * as moment  from 'moment';


//Essa declaração informa ao Angular que tem um objeto fora, no caso no navegador, que eu quero utilizar
//por conta disso utiliza o "declare". Neste caso será para utilizar a GeoLocalização. A mesma utilização
//é feita quando deseja a utilizar objeto do tipo window ou location.
declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent implements OnInit {
  title:string = "Controle de Ponto";

  //A API recebe a data em inglês, por conta disso foi criado esse atributo.
  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(private snackBar:MatSnackBar, private router:Router, private httpUtil: HttpUtilService, private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.obterGeoLocalizacao();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();
  }

  obterGeoLocalizacao(): string{
    //Não são todos os navegadores que tem a geolocalização implementado, por isso o uso do if.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`;
      })
      return '';
    }
  }

  iniciarTrabalho(){
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho(){
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco(){
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco(){
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  obterUltimoLancamento(){
    this.lancamentoService.buscarUltimoTipoLancado().subscribe(
      data => {
        this.ultimoTipoLancado = data.data ? data.data.tipo : '';
      },
      err => {
        const msg: string = "Erro obtendo último lançamento!";
        this.snackBar.open(msg, "Erro", {duration: 5000});
      }
    )
  }

  cadastrar(tipo:Tipo){
    this.lancamentoService.lancamento = {
      data: this.dataAtualEn,
      tipo: tipo,
      localizacao: this.geoLocation,
      funcionarioId: this.httpUtil.obterIdUsuario()
    }
    this.lancamentoService.cadastrar().subscribe(data => {
      const msg: string = 'Lançamento realizado com sucesso!';
      this.snackBar.open(msg, "Sucesso", {duration: 5000});
      this.router.navigate(['/funcionario/listagem']);
    },
    err => {
      let msg: string = 'Tente novamente em instantes.'
      if(err.status == 400) {
        msg = err.error.errors.join(' ');
      }
      this.snackBar.open(msg,'Erro',{duration: 5000});
    }
    )
  }

  obterUrlMapa(): string{
    return "https://www.google.com/maps/search/?api=1&query=" + this.geoLocation;
  }

  exibirInicioTrabalho(): boolean{
    return this.ultimoTipoLancado == '' || this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean{
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO || this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO;
  }

  exibirInicioAlmoco(): boolean{
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean{
    return this.ultimoTipoLancado == Tipo.INICIO_ALMOCO;
  }

}
