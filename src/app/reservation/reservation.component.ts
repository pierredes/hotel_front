import { AfterContentInit, AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput, EventSourceInput } from '@fullcalendar/angular';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../classe/client';
import { Hotel } from '../classe/hotel';
import { Reservation } from '../classe/reservation';
import { ClientService } from '../service/client.service';
import { HotelService } from '../service/hotel.service';
import { ReservationService } from '../service/reservation.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  showModal: boolean = false;
  reservation : Reservation = new Reservation();
  reservations : Array<Reservation> = []
  clients : Array<Client> = [];
  hotels : Array<Hotel> = [];
  search : string | undefined = "";
  @ViewChild('closeModal') closeModal : ElementRef<HTMLElement> | undefined
  @ViewChild('deletereservation') deletereservation : ElementRef | undefined

  calendarOptions : CalendarOptions = {
    initialView : "dayGridMonth",
    eventClick: this.showModalOptionsCalendar.bind(this),

  }

  showModalOptionsCalendar(clickInfo: EventClickArg) {
    this.showModal = true;
    this.getReservationById(clickInfo.event.id);
    document.getElementById('deletereservation')?.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        console.log(clickInfo.event.id)
        this.rs.deleteReservationById(clickInfo.event.id).subscribe(
          data=> {
            console.log("ok");
            this.getAllReservation();
          },
          erreur => {
            console.log(erreur)
          }
        )
      }
    })
  }



  constructor(private rs : ReservationService, private cs : ClientService, private hs : HotelService) { }

  ngOnInit(): void {
    this.getAllReservation();
    this.getAllClient();
    this.getAllHotel();
  }

  getAllReservation() : void {
    let tableau:  { title: string | undefined; start: Date | undefined, end: Date | undefined }[] = [];
    this.rs.getAllReservation(this.search).subscribe(
      data => {
        this.reservations = data;
        for(let datas of data) {
          let tableau_calendar = {
            id: datas.id,
            title: "Réservation au nom de : " + datas.client?.nomComplet + " hotel : " + datas.hotel?.nom + " chambre numéro : " + datas.numeroChambre,
            start: datas.dateDebut,
            end: datas.dateFin }
          tableau.push(tableau_calendar);
        }
          this.calendarOptions.events = tableau;
      },
      erreur => {
        console.log(erreur)
      }
    )
  }

  getAllClient() : void {
    this.cs.getAllClient().subscribe(
      data => {
        this.clients = data;
      },
      erreur => {
        console.log(erreur)
      }
    )
  }

  getAllHotel() : void {
    this.hs.getAllHotel().subscribe(
      data => {
        this.hotels = data;
      },
      erreur => {
        console.log(erreur)
      }
    )
  }

  submit() : void {
    if(this.reservation.id == undefined) {
        this.rs.addReservation(this.reservation).subscribe(
        data => {
          this.getAllReservation();
          this.closeModal?.nativeElement.click();
        },
        erreur => {
          console.log(erreur)
        }
      )
    }
    else {
      this.rs.updateReservation(this.reservation.id ,this.reservation).subscribe(
        data => {
          this.getAllReservation();
        },
        erreur => {
          console.log(erreur)
        }
      )
    }

  }

  getReservationById(id : string | undefined) {
    this.rs.getReservationById(id).subscribe(
      data => {
        this.reservation = data;
        console.log(this.reservation.id)
      },
      erreur => {
        console.log(erreur)
      }

    )
  }

  hide() {
    this.showModal = false;
  }

  compareClient(c1: Client, c2: Client): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
}

compareHotel(c1: Hotel, c2: Hotel): boolean {
  return c1 && c2 ? c1.id === c2.id : c1 === c2;
}


}


