import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../services/rooms.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent {

  @Input() room!: Room;

  @Output() select = new EventEmitter<Room>();

  onBookNow(): void {
    this.select.emit(this.room);
  }

}