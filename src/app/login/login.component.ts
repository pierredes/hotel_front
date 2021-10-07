import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ls : AdminService) { }

  admin = {
    username : "",
    password : ""
  }

  ngOnInit(): void {
  }

  login() : void {
    this.ls.login(this.admin).subscribe(
      data => {
        console.log(data)
        sessionStorage.setItem("connecter", data)
      },
      erreur => {
        console.log(erreur)
      }
    )
  }

}
