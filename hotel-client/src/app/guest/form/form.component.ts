import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {GuestService} from '../guest.service';
import {Observable} from 'rxjs';

import {Guest} from '../guest';

@Component({
  selector: 'guest-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  formGuest: FormGroup;
  guest: Guest;

  constructor(
    private formBuilder: FormBuilder,
    private guestService: GuestService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.createForm(this.newGuest());
  }

  editOrCreate(): void {
    if (this.guest) {
      const id = this.guest.id;
      this.findGuestById(id).toPromise().then(guest => this.createForm(guest));
    } else {
      this.createForm(this.newGuest());
    }
  }

  createForm(guest: Guest): void {
    this.formGuest = this.formBuilder.group({
      name: [guest.name, [Validators.required, Validators.minLength(2)]],
      lastname: [guest.lastname, [Validators.required, Validators.minLength(2)]],
      email: [guest.email, [Validators.required, Validators.email]],
      phone: [guest.phone, [Validators.required, Validators.minLength(8)]],
      document: [guest.document, [Validators.required, Validators.minLength(6)]],
      id: [guest.id],
    });
  }

  successMessage(name: string, operation: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Form Send',
      detail: `Guest ${operation} sucessfull!!`
    });
  }

  errorMessage(): void {
    this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Error save data'});
  }


  onSubmit(): void {
    let guest: Guest = this.formGuest.value;
    if (!guest) {
      return;
    }
    if (guest.id) {
      this.guestService.updateGuest(guest)
        .subscribe(result => {
          this.successMessage(result.name, 'Updated');
          this.formGuest.reset();
        });
    } else {
      guest.id = this.createId();
      this.guestService.addGuest(guest)
        .subscribe(
          result => {
            this.successMessage(result.name, 'Created');
            this.formGuest.reset();
          },
          err => {
            this.errorMessage();
          });
    }

  }

  findGuestById(id: string): Observable<Guest> {
    return this.guestService.findGuestById(id);
  }

  newGuest(): Guest {
    return {
      id: '',
      phone: '',
      name: '',
      lastname: '',
      document: '',
      email: ''
    };
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
