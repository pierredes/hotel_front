import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../classe/hotel';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit {

  erreur: any;
  success : boolean = false;
  error : boolean = false;
  hotels : Array<Hotel> = [];
  hotel : Hotel = new Hotel();
  @ViewChild('closeModal') closeModal : ElementRef | undefined;

  constructor(private hs : HotelService) { }

  ngOnInit(): void {
    this.getAllHotel();
  }

  getAllHotel() : void {
    this.hs.getAllHotel().subscribe(
      data => {
        this.hotels = data;
      }
    )
  }

  submit() : void {
    if (this.hotel.id == undefined) {
      this.hs.addHotel(this.hotel).subscribe(
        data => {
          this.closeModal?.nativeElement.click();
          this.getAllHotel();
          this.success = true;
          this.error = false;
        },
        erreur => {
          this.erreur = erreur.error;
        }
      )
    } else {
      this.hs.updateHotel(this.hotel.id, this.hotel).subscribe(
        data => {
          this.closeModal?.nativeElement.click();
          this.getAllHotel();
          this.success = true;
          this.error = false;
        },
        erreur => {
          this.erreur = erreur.error;
        }
      )
    }

  }

  getHotelById(id : number | undefined) : void {
    this.hs.getHotelById(id).subscribe(
      data => {
        this.hotel = data;
      },
      erreur => {
        console.log(erreur);
      }
    )
  }

  deleteHotelById(id : number | undefined) : void {
    this.hs.deleteHotelById(id).subscribe(
      data => {
        this.getAllHotel();
        this.success = true;
        this.error = false;
      },
      erreur => {
        console.log(erreur);
        this.error = true;
        this.success = false;
      }
    )
  }

}
