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
    this.guest = {...guest};
    this.guestForm.guest = this.guest;
    this.guestDialog = true;
    this.guestForm.editOrCreate();
  }

  deleteGuest(guest: Guest): void {
    this.confirmationService.confirm({
      message: 'Você deseja deletar o hóspede ' + guest.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.guests = this.guests.filter(val => val.id !== guest.id);
        //TODO adicionar chamada encadeada service
        this.guestService.removeGuest(guest);
        this.guest = GuestComponent.newGuest();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Hóspede excluido com sucesso.',
          life: 3000
        });
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
