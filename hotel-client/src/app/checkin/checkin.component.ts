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
    checkin.checkin = new Date(checkin.checkin);
    checkin.checkout = new Date(checkin.checkout);
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
        this.checkinService.delete(checkin).subscribe(result => {
          this.checkins = this.checkins.filter(val => val.id !== checkin.id);
          this.checkin = this.newCheckin();
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Checkin Deleted', life: 3000});
        },
            err => this.messageService.add({severity: 'error', summary: 'Warning', detail: 'Error remove register', life: 3000}));
      }
    });
  }

  hideDialog(): void {
    this.checkinDialog = false;
  }

  saveCheckin(): void {
    this.checkin.guest = this.selectedGuest;

    if (this.checkin.id === '') {
      this.checkinDialog = false;
      this.checkinService
        .addCheckin(this.checkin)
        .subscribe(data => {
          this.checkins.push(data);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Checkin created', life: 3000});
        }, error => this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Error create checkin', life: 3000}));
    } else {
      this.checkinDialog = false;
      this.checkinService
        .updateCheckin(this.checkin)
        .subscribe(
          data => this.messageService.add({severity: 'info', summary: 'Okay', detail: 'Checkin updated', life: 3000}),
        err => this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Error edit register', life: 3000}));
    }
    this.checkins = [...this.checkins];
    this.checkin = this.newCheckin();
  }

  newCheckin(): Checkin {
    return {
      id: '',
      checkin: null,
      checkout: null,
      hasCar: false,
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
    if (this.filter.name === '' && this.filter.document === '' && this.filter.phone === '') {
      this.messageService.add({severity: 'info', summary: 'Info', detail: 'Please select a filter', life: 3000});
    } else {
      this.checkinService.findFiltered(this.filter)
        .subscribe(
          data => this.checkins = [...data],
          err => this.messageService.add({severity: 'warn', summary: 'Info', detail: 'Can not find results', life: 3000}));
    }
  }
}
