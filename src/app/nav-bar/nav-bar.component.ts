import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() title:string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  sair() {
    delete localStorage['token'];
    delete sessionStorage['funcionarioId'];
    this.router.navigate(['/']);
  }

  autenticado():boolean {
    return localStorage['token'];
  }

}
