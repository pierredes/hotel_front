import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {path : "client", component: ClientComponent},
  {path : "hotel", component: HotelComponent},
  {path : "reservation", component: ReservationComponent},
  {path : "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
