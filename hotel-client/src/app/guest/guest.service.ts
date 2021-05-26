import { Injectable } from '@angular/core';
import { Guest } from './guest';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  guest: Guest[];

  constructor() {
    this.guest = [
      {
        id: 'dfasdfa',
        name: 'teste1',
        lastname: 'teste11',
        document: '9712390f',
        phone: '32887723321',
        image: '',
        email: 'teste1@teste.com',
        checkout: new Date(),
        checking: new Date(),
      },
      {
        id: 'ksjdjoaisdjjfa',
        name: 'teste2',
        lastname: 'teste22',
        document: '9712390g',
        phone: '32887723322',
        image: '',
        email: 'teste2@teste.com',
        checkout: new Date(),
        checking: new Date(),

      }
    ]
  }

  public getAll(): Observable<Guest[]> {
    return of(this.guest);
  }

  public addGuest(guest: Guest): Observable<Guest> {
    this.guest.push(guest)
    console.log(this.guest);
    return of(guest);
  }

  public updateGuest(guest: Guest): Observable<Guest> {
    const index = this.guest
      .indexOf(this.guest.find(value => value.id === guest.id));
    this.guest[index] = guest;
    return of(this.guest[index]);
  }

  public removeGuest(guest: Guest) {
    this.guest = this.guest.filter(findGuest => findGuest !== guest);
    console.log(this.guest);
  }

  public getByName(name: string): Guest {
    return this.guest.find(guest => guest.name === name);
  }

  public getByDocument(document: string): Guest {
    return this.guest.find(guest => guest.document === document);
  }

  public getByPhone(phone: string): Guest {
    return this.guest.find(guest => guest.phone === phone);
  }

  findGuestById (id: string): Observable<Guest> {
    return of(this.guest.find(guest => guest.id === id));
  }
}
