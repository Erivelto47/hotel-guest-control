import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {GuestService} from '../guest.service';

import {Guest} from '../guest';

@Component({
  selector: 'guest-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  @Input() guests: Guest[];

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
      this.createForm(this.guest);
    } else {
      this.createForm(this.newGuest());
    }
  }

  createForm(guest: Guest): void {
    this.formGuest = this.formBuilder.group({
      name: [guest.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [guest.email, [Validators.required, Validators.email]],
      phone: [guest.phone, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
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
            this.guest = result;
            this.guests[this.guests.indexOf(guest)] = result;
          },
          error => {
            this.errorMessage();
            this.guest = guest
          });
    } else {
      this.guestService.addGuest(guest)
        .subscribe(
          result => {
            this.successMessage(result.name, 'Created');
            this.formGuest.reset();
            this.guest = result;
            this.guests.push(result);
          },
          err => {
            this.errorMessage();
            this.guest = guest
          });
    }
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

}
