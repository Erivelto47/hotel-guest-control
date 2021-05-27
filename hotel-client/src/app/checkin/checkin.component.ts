import {Component, OnInit} from '@angular/core';
import {Checkin} from './checkin';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CheckinService} from './checkin.service';
import {Guest} from '../guest/guest';
import {GuestService} from '../guest/guest.service';

interface Filter {
  name: string;
  phone: string;
  document: string;
  situation: any[];
}

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styles: [`
    :host ::ng-deep .p-dialog {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: inline-flex;
    }
  `],
  providers: [ConfirmationService]
})
export class CheckinComponent implements OnInit {

  checkinDialog: boolean;

  checkins: Checkin[];

  checkin: Checkin;
  selectedGuest: Guest;
  guests: Guest[];

  filter: Filter = {
    name: '',
    document: '',
    phone: '',
    situation: []
  };

  constructor(private checkinService: CheckinService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private guestService: GuestService) { }

  ngOnInit(): void {
    this.checkinService.findAll().subscribe(data => this.checkins = data);
    this.guestService.getAll().subscribe(data => this.guests = data);
  }

  openNew(): void {
    this.checkin = this.newCheckin();
    this.checkinDialog = true;
  }

  editCheckin(checkin: Checkin): void {
    this.selectedGuest = checkin.guest;
    this.checkin = {...checkin};
    this.checkinDialog = true;
  }

  deleteCheckin(checkin: Checkin): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + checkin.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.checkins = this.checkins.filter(val => val.id !== checkin.id);
        this.checkin = this.newCheckin();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Checkin Deleted', life: 3000});
      }
    });
  }

  hideDialog(): void {
    this.checkinDialog = false;
  }

  saveCheckin(): void {
    if (!this.checkin) {
      return;
    }
    if (!this.checkin.id) {
      this.checkin.id = this.createId();
      this.checkinDialog = false;
      this.checkinService.addCheckin(this.checkin);
    } else {
      this.checkinDialog = false;
      this.checkinService.updateCheckin(this.checkin);
    }
    this.checkins = [...this.checkins];
    this.checkin = this.newCheckin();
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  newCheckin(): Checkin {
    return {
      id: '',
      checkin: null,
      checkout: null,
      total: 0,
      laststay: 0,
      guest: {
        id: '',
        name: '',
        lastname: '',
        phone: '',
        document: '',
        email: ''
      },
    };
  }

  searchFiltered(): void {
   console.log(this.filter);
  }
}
