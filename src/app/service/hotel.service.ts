import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../classe/hotel';
import { httpOption } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http : HttpClient) { }

  getAllHotel() : Observable<Hotel[]> {
    return this.http.get<Hotel[]>(environment.base_url + "hotel/", httpOption);
  }

  getHotelById(id : number | undefined) : Observable<Hotel> {
    return this.http.get<Hotel>(environment.base_url + "hotel/" + id, httpOption);
  }

  addHotel(hotel : Hotel) : Observable<Hotel> {
    return this.http.post<Hotel>(environment.base_url + "hotel/", hotel, httpOption);
  }

  updateHotel(id : number | undefined, hotel : Hotel) : Observable<Hotel> {
    return this.http.put<Hotel>(environment.base_url + "hotel/update/" + id, hotel, httpOption);
  }

  deleteHotelById(id : number | undefined) : Observable<Object> {
    return this.http.delete(environment.base_url + "hotel/delete/" + id, httpOption);
  }

}
