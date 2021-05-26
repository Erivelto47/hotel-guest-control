import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Guest } from './guest';
import { GuestService } from './guest.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
  styles: [`
        :host ::ng-deep .p-dialog {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  providers: [MessageService, ConfirmationService]
})
export class GuestComponent implements OnInit, AfterViewInit {

  @ViewChild(FormComponent, {static: false})
  guestForm: FormComponent;

  guestDialog: boolean;

  guest: Guest;

  selectedGuests: Guest[];

  guests: Guest[];

  cols: any[];

  _selectedColumns: any[];

  constructor( private guestService: GuestService,
               private messageService: MessageService,
               private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {

    this.guestService.getAll().subscribe(guests => this.guests = guests);

    this.cols = [
      { field: 'image', header: 'Image' },
      { field: 'name', header: 'Name' },
      { field: 'lastname', header: 'Lastname' },
      { field: 'document', header: 'Document' },
      { field: 'phone', header: 'Phone' },
      { field: 'email', header: 'Email' },
      { field: 'checking', header: 'Checking' },
      { field: 'checkout', header: 'Checkout' },
    ];

    this._selectedColumns = [
      { field: 'image', header: 'Image' },
      { field: 'name', header: 'Name' },
      { field: 'phone', header: 'Phone' },
      { field: 'email', header: 'Email' },
    ];
  }

  openNew() {
    this.guestDialog = true;
    this.guestForm.guest = null;
    this.guestForm.editOrCreate();
  }

  deleteSelectedGuests() {
    this.confirmationService.confirm({
      message: 'Voce deseja deletar os registros selecionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //TODO adicionar chamada encadeada service
        this.selectedGuests.forEach(guest => this.guestService.removeGuest(guest));
        this.guests = this.guests.filter(guest => !this.selectedGuests.includes(guest));
        this.selectedGuests = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Hóspedes removidos com sucesso.', life: 3000});
      }
    })
  }

  editGuest(guest: Guest) {
    this.guest = {...guest};
    this.guestForm.guest = this.guest;
    this.guestDialog = true;
    this.guestForm.editOrCreate();
  }

  deleteGuest(guest: Guest) {
    this.confirmationService.confirm({
      message: 'Você deseja deletar o hóspede ' + guest.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.guests = this.guests.filter(val => val.id !== guest.id);
        //TODO adicionar chamada encadeada service
        this.guestService.removeGuest(guest);
        this.guest = GuestComponent.newGuest();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Hóspede excluido com sucesso.', life: 3000});
      }
    })
  }

  private static newGuest (): Guest {
    return { id: '', image: '', phone: '', name: '', lastname: '', document: '', email: '', checking: new Date(), checkout: new Date()};
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  ngAfterViewInit () {
  }

}
