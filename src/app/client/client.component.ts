import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../classe/client';
import { httpOption } from '../variables';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
 
 
    
  clients : Array<Client> = [];

  constructor(private htpp : HttpClient) { }

  ngOnInit(): void {
    this.htpp.get<Client[]>(  environment.base_url +"client/", httpOption ).subscribe(
      data => {
        console.log(data)
        this.clients = data;
      }
    )
    
  }

}
