import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';


const routes: Routes = [
  { path: 'rooms', component: RoomsListComponent },
  { path: 'booking', component: BookingFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoomsListComponent,
    RoomCardComponent,
    BookingFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }