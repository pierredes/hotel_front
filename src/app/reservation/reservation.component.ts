import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
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
  erreur : any;
  success : boolean = false;
  error : boolean = false;
  showModal: boolean = false;
  reservation : Reservation = new Reservation();
  reservations : Array<Reservation> = []
  clients : Array<Client> = [];
  hotels : Array<Hotel> = [];
  search : string | undefined = "";
  @ViewChild('closeModal') closeModal : ElementRef<HTMLElement> | undefined
  @ViewChild('deletereservation') deletereservation : ElementRef | undefined

  calendarOptions : CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView : "dayGridMonth",
    eventClick: this.showModalOptionsCalendar.bind(this)

  }

  constructor(private rs : ReservationService, private cs : ClientService, private hs : HotelService) { }

  ngOnInit(): void {
    this.getAllReservation();
    this.getAllClient();
    this.getAllHotel();
  }

  showModalOptionsCalendar(clickInfo: EventClickArg) {
    this.showModal = true;
    this.getReservationById(clickInfo.event.id);
    document.getElementById('deletereservation')?.addEventListener("click", () => {
        this.rs.deleteReservationById(clickInfo.event.id).subscribe(
          data => {
            this.getAllReservation();
            this.showModal = false;
            this.success = true;
            this.error = false;
            this.reservation = new Reservation();
            setTimeout(() => {
              this.success = false;
            }, 5000);
          },
          erreur => {
            this.error = true;
            this.success = false;
          }
        )
    })
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
            end: datas.dateFin,
          }
          tableau.push(tableau_calendar);
        }
          this.calendarOptions.events = tableau;
      },
      erreur => {
        console.log(erreur);
        this.error = true;
        this.success = false;
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
          this.success = true;
          this.error = false;
        },
        erreur => {
          console.log(erreur);
          this.error = true;
          this.success = false;
          this.erreur = erreur.error.message;
        }
      )
    }
    else {
      this.rs.updateReservation(this.reservation.id ,this.reservation).subscribe(
        data => {
          this.getAllReservation();
          this.showModal = false;
          this.success = true;
          this.error = false;
          this.reservation = new Reservation();
        },
        erreur => {
          this.erreur = erreur.error.message;
          this.error = true;
          this.success = false;
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

  // goToDate(date : Date | undefined) : Date | undefined {
  //   return this.calendarOptions.initialDate = date;
  // }


}


