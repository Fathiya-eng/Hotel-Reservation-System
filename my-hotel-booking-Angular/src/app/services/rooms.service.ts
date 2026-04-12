import { Injectable } from '@angular/core';

export interface Room {
  image: string;
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor() {}

  rooms: Room[] = [
    { image: "assets/room1.png", id: 1, name: 'Classic Single', type: 'Single', price: 55, available: true, rating: 4.1 },
    { image: "assets/room2.png", id: 2, name: 'Deluxe Double', type: 'Double', price: 90, available: true, rating: 4.5 },
    { image: "assets/room3.png", id: 3, name: 'Premium Suite', type: 'Suite', price: 180, available: true, rating: 4.8 },
    { image: "assets/room4.png", id: 4, name: 'Economy Single', type: 'Single', price: 40, available: false, rating: 3.9 },
    { image: "assets/room5.png", id: 5, name: 'Family Double', type: 'Double', price: 110, available: true, rating: 4.3 },
    { image: "assets/room6.png", id: 6, name: 'Executive Suite', type: 'Suite', price: 220, available: false, rating: 4.7 }
  ];

  getRooms() {
    return this.rooms;
  }

  getAvailableRooms(): Room[] {
  return this.rooms.filter(room => room.available);
}
}