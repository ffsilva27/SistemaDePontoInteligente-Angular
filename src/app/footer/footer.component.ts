import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navegar(event:string){
    switch(event){
      case 'in':
        return "https://www.linkedin.com/in/filipe-ferreira-silva/";
        break;
      case 'git':
        return "https://github.com/ffsilva27";
        break;
      default:
        break;
    }
  }

}
