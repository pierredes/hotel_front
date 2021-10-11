import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username : string | null =""
  constructor(private router : Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('connecter')) {
      this.username = sessionStorage.getItem('connecter')
    }
  }

  isConnected() : boolean {
    if (sessionStorage.getItem('connecter')) {
      return true;
    } else {
      return false;
    }
  }

  deconnexion() : void {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

}
