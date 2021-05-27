import {Component, OnInit} from '@angular/core';
import {Checkin} from './checkin';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CheckinService} from './checkin.service';
import {Guest} from '../guest/guest';
import {GuestService} from '../guest/guest.service';
import {Filter} from '../shared/common/Filter';

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
    situation: ''
  };

  constructor(private checkinService: CheckinService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private guestService: GuestService) {
  }

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
    this.checkin = checkin;
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
      this.checkinService.addCheckin(this.checkin)
        .subscribe(data => {
          this.checkins.push(data);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Checkin created', life: 3000});
        }, error => this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Error create checkin', life: 3000}));
    } else {
      this.checkinDialog = false;
      this.checkinService.updateCheckin(this.checkin)
        .subscribe(
          data => this.messageService.add({severity: 'info', summary: 'Okay', detail: 'Checkin updated', life: 3000}),
        err => this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Error edit register', life: 3000}));
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
    if (this.filter.situation.length === 0
      && this.filter.name === ''
      && this.filter.phone === ''
      && this.filter.document === '') {
      this.messageService.add({severity: 'info', summary: 'Inform', detail: 'Please select a filter', life: 3000});
    } else {
      this.checkinService.findFiltered(this.filter).subscribe(data => this.checkins = [...data]);
    }
  }
}
