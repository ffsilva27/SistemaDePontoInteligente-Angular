import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tipo } from 'src/app/shared/tipo.enum';
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

  //A API recebe a data em inglês, por conta disso foi criado esse atributo.
  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(private snackBar:MatSnackBar, private router:Router) { }

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
    this.ultimoTipoLancado = '';
  }

  cadastrar(tipo:Tipo){
    alert(`Tipo: ${tipo}, dataAtualEn: ${this.dataAtualEn}, geoLocation: ${this.geoLocation}`);
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
