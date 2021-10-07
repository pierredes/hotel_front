import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpOption } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  login(admin : any) {
    return this.http.post<any>(environment.base_url + "login/", admin, httpOption);
  }
}
