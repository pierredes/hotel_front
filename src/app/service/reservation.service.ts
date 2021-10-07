import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../classe/reservation';
import { httpOption } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http : HttpClient) { }

  getAllReservation() : Observable<Reservation[]> {
    return this.http.get<Reservation[]>(environment.base_url + "reservation/", httpOption);
  }

  getReservationById(id : string | undefined) : Observable<Reservation> {
    return this.http.get<Reservation>(environment.base_url + "reservation/" + id, httpOption);
  }

  addReservation(reservation : Reservation) : Observable<Reservation> {
    return this.http.post<Reservation>(environment.base_url + "reservation/", reservation, httpOption);
  }

  updateReservation(id : number | undefined, reservation : Reservation) : Observable<Reservation> {
    return this.http.put<Reservation>(environment.base_url + "reservation/update/" + id,reservation, httpOption);
  }

  deleteReservationById(id : string | undefined) : Observable<Object> {
    return this.http.delete(environment.base_url + "reservation/delete/" + id, httpOption);
  }


}
