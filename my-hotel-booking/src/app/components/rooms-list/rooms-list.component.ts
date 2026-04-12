import { Component, OnInit } from '@angular/core';
import { RoomsService, Room } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  rooms: Room[] = [];
  showAvailableOnly: boolean = false;

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.rooms = this.roomsService.getRooms();
  }

  get filteredRooms(): Room[] {
    if (this.showAvailableOnly) {
      return this.rooms.filter(room => room.available);
    }
    return this.rooms;
  }

  onSelect(room: Room): void {
    console.log('Selected room:', room);
  }
}