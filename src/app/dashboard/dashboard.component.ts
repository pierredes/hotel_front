import { Component, OnInit } from '@angular/core';
import { ReservationComponent } from '../reservation/reservation.component';
import { ClientService } from '../service/client.service';
import { HotelService } from '../service/hotel.service';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nombreClients : number | undefined = 0;
  nombreHotels : number | undefined = 0;
  nombreReservations : number | undefined = 0;
  constructor( private cs : ClientService, private hs : HotelService, private rs : ReservationService) { }

  ngOnInit(): void {
    this.getNombreClient();
    this.getNombreHotel();
    this.getNombreReservation();
  }

  getNombreClient(): void {
    this.cs.getAllClient().subscribe(
      data => {
        this.nombreClients = data.length;
      }
    )
  }

  getNombreHotel(): void {
    this.hs.getAllHotel().subscribe(
      data => {
        this.nombreHotels = data.length;
      }
    )
  }

  getNombreReservation() : void {
    this.rs.getAllReservation("").subscribe(
      data => {
        this.nombreReservations = data.length;
      }
    )
  }

}
