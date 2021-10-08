import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../classe/client';
import { httpOption } from '../variables';
import { environment } from 'src/environments/environment';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  erreur : any;
  success : boolean = false;
  error : boolean = false;
  clients : Array<Client> = [];
  client : Client = new Client();
  @ViewChild('closemodal') closemodal : ElementRef | undefined;
  constructor(private cs : ClientService) { }

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient() : void {
    this.cs.getAllClient().subscribe(
      data => {
        console.log(data)
        this.clients = data;
      }
    )
  }

  submit() : void {
    if(this.client.id == undefined) {
      this.cs.addClient(this.client).subscribe (
        data => {
          this.closemodal?.nativeElement.click();
          this.getAllClient();
          this.success = true;
          this.error = false;
          this.erreur = "";
        },
        erreur => {
          this.erreur = erreur.error;
        }
      )
    } else {
      this.cs.updateClient(this.client.id, this.client).subscribe(
        data => {
          this.closemodal?.nativeElement.click();
          this.getAllClient();
          this.success = true;
          this.error = false;
        },
        erreur => {
          this.erreur = erreur.error;
        }
      )
    }

  }

  getClientById(id : number | undefined) : void {
    this.cs.getClientById(id).subscribe(
      data => {
        this.client = data;
      },
      erreur => {
        console.log(erreur)
      }
    )
  }

  deleteClient(id : number | undefined) : void {
    this.cs.deleteClientById(id).subscribe(
      data => {
        this.getAllClient();
        this.success = true;
        this.error = false;
      },
      erreur => {
        console.log(erreur);
        this.success = false;
        this.error = true;
      }
    )
  }

}
