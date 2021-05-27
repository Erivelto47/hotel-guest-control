import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GuestService} from '../guest.service';
import {Guest} from '../guest';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html'
})
export class GuestListComponent implements OnInit {

  @Input() guests: Guest[];

  guest: Guest;

  @Input() selectedGuests: Guest[];

  @Input() edit: boolean;

  @Output() editGuest = new EventEmitter();

  @Output() deleteGuest = new EventEmitter();

  cols: any[];

  #_selectedColumns: any[];

  constructor() {
  }

  ngOnInit(): void {

    this.cols = [
      {field: 'image', header: 'Image'},
      {field: 'name', header: 'Name'},
      {field: 'lastname', header: 'Lastname'},
      {field: 'document', header: 'Document'},
      {field: 'phone', header: 'Phone'},
      {field: 'email', header: 'Email'},
    ];

    this.#_selectedColumns = [
      {field: 'name', header: 'Name'},
      {field: 'phone', header: 'Phone'},
      {field: 'email', header: 'Email'},
    ];
  }

  @Input() get selectedColumns(): any[] {
    return this.#_selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this.#_selectedColumns = val;
  }

  onEditGuest(guest: Guest): void {
    this.editGuest.emit(guest);
  }

  onDeleteGuest(guest: Guest): void {
    this.deleteGuest.emit(guest);
  }

}
