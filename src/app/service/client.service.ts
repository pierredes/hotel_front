import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../classe/client';
import { httpOption } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http : HttpClient) { }

  getAllClient() : Observable<Client[]> {
    return this.http.get<Client[]>(  environment.base_url +"client/", httpOption );
  }

  getClientById(id: number | undefined) : Observable<Client> {
    return this.http.get<Client>(environment.base_url + "client/" + id, httpOption);
  }

  addClient(client : Client) : Observable<Client> {
    return this.http.post<Client>(environment.base_url + "client/", client, httpOption);
  }

  updateClient(id: number | undefined, client : Client) : Observable<Client> {
    return this.http.put<Client>(environment.base_url + "client/update/" + id, client , httpOption);
  }

  deleteClientById(id: number | undefined) : Observable<Object> {
    return this.http.delete(environment.base_url + "client/delete/" + id, httpOption);
  }

}
