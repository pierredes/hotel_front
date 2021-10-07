import { Client } from "./client";
import { Hotel } from "./hotel";

export class Reservation {
  public id : number | undefined;
  public dateDebut : Date | undefined;
  public dateFin : Date | undefined;
  public numeroChambre : number | undefined;
  public client : Client | undefined;
  public hotel : | Hotel | undefined;

  constructor(id? : number | undefined, dateDebut? : Date | undefined, dateFin? : Date | undefined, numeroChambre? : number | undefined, client? : Client | undefined, hotel? : | Hotel | undefined) {
    this.id = id;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.numeroChambre = numeroChambre;
    this.client = client;
    this.hotel = hotel;
  }
}
