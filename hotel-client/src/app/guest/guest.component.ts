import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Guest} from './guest';
import {GuestService} from './guest.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormComponent} from './form/form.component';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styles: [`
    :host ::ng-deep .p-dialog {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
    }
  `],
  providers: [ConfirmationService]
})
export class GuestComponent implements OnInit, AfterViewInit {

  @ViewChild(FormComponent, {static: false})
  guestForm: FormComponent;

  guestDialog: boolean;
  guest: Guest;
  guests: Guest[];

  constructor(private guestService: GuestService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.guestService.getAll().subscribe(guests => this.guests = guests);
  }

  openNew(): void {
    this.guestDialog = true;
    this.guestForm.guest = null;
    this.guestForm.editOrCreate();
  }

  editGuest(guest: Guest): void {
    this.guestForm.guest = guest;
    this.guestDialog = true;
    this.guestForm.editOrCreate();
    this.guests[this.guests.indexOf(guest)] = this.guestForm.guest;
  }

  deleteGuest(guest: Guest): void {
    this.confirmationService.confirm({
      message: 'You want to delete the guest ' + guest.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.guestService.removeGuest(guest)
          .subscribe(
            result => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: `Guest deleted.`,
                life: 3000
              });
              this.guests = this.guests.filter(val => val.id !== guest.id);
          },
            err => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Error to delete. Please verify Checkin dependency`,
                life: 5000
              });
            });
        this.guest = GuestComponent.newGuest();
      }
    });
  }

  static newGuest(): Guest {
    return {
      id: '',
      phone: '',
      name: '',
      lastname: '',
      document: '',
      email: '',
    };
  }

  ngAfterViewInit(): void {
  }

}
