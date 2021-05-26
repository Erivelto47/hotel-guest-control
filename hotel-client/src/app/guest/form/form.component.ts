import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GuestService } from '../guest.service';
import { Observable } from 'rxjs';

import { Guest } from '../guest';

@Component({
  selector: 'guest-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formGuest: FormGroup;

  uploadedFile: any[] = [];

  guest: Guest;

  constructor (
    private formBuilder: FormBuilder,
    private guestService: GuestService,
    private messageService: MessageService) {
  }

  ngOnInit (): void {
    this.createForm(FormComponent.newGuest());
  }

  editOrCreate (): void {
    if (this.guest) {
      const id = this.guest.id;
      this.findGuestById(id).toPromise().then(guest => this.createForm(guest));
    } else {
      this.createForm(FormComponent.newGuest());
    }
  }

  createForm (guest: Guest): void {
    this.formGuest = this.formBuilder.group({
      name: [guest.name, [Validators.required, Validators.minLength(2)]],
      lastname: [guest.lastname, [Validators.required, Validators.minLength(2)]],
      email: [guest.email, [Validators.required, Validators.email]],
      phone: [guest.phone, [Validators.required, Validators.minLength(8)]],
      document: [guest.document, [Validators.required, Validators.minLength(6)]],
      image: [guest.image],
      id: [guest.id]
    });
  }

  successMessage (name: string, operation: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Form Enviado',
      detail: 'Hóspede ' + name + ' ' + operation + ' com sucesso!!'
    });
  }

  errorMessage (): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Os dados não foram Salvos' });
  }


  onSubmit (): void {
    let guest: Guest = this.formGuest.value;
    if(guest.id) {
      this.guestService.updateGuest(guest)
        .subscribe(result => {
          this.successMessage(result.name, 'atualizado');
          this.formGuest.reset();
        });
    } else {
      guest.id = this.createId();
      this.guestService.addGuest(guest)
        .subscribe(
          result => {
            this.successMessage(result.name, 'criado');
            this.formGuest.reset();
          },
          err => {
            this.errorMessage();
            console.log(err);
          });
    }

  }

  findGuestById (id: string): Observable<Guest> {
    return this.guestService.findGuestById(id);
  }

  private static newGuest (): Guest {
    return {
      id: '',
      image: '',
      phone: '',
      name: '',
      lastname: '',
      document: '',
      email: '',
      checking: new Date(),
      checkout: new Date()
    };
  }

  createId (): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onUpload (event) {
    for (let file of event.files) {
      this.uploadedFile.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}
