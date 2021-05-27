import {Injectable} from '@angular/core';
import {Guest} from './guest';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  guests: Guest[];

  constructor() {
    this.guests = [
      {
        id: 'dfasdfa',
        name: 'teste1',
        lastname: 'teste11',
        document: '9712390f',
        phone: '32887723321',
        email: 'teste1@teste.com',
      },
      {
        id: 'ksjdjoaisdjjfa',
        name: 'teste2',
        lastname: 'teste22',
        document: '9712390g',
        phone: '32887723322',
        email: 'teste2@teste.com',
      },
      {
        id: 'ksjdjoaisdfdsfa',
        name: 'teste3',
        lastname: 'teste33',
        document: '9712390gf87s',
        phone: '32887723123',
        email: 'teste3@teste.com',
      },
      {
        id: 'ksjdjodfdsfa',
        name: 'teste4',
        lastname: 'teste44',
        document: '9712gf87s',
        phone: '323123',
        email: 'teste4@teste.com'
      }];
  }

  public getAll(): Observable<Guest[]> {
    return of(this.guests);
  }

  public addGuest(guest: Guest): Observable<Guest> {
    this.guests.push(guest);
    console.log(this.guests);
    return of(guest);
  }

  public updateGuest(guest: Guest): Observable<Guest> {
    const index = this.guests
      .indexOf(this.guests.find(value => value.id === guest.id));
    this.guests[index] = guest;
    return of(this.guests[index]);
  }

  public removeGuest(guest: Guest): void {
    this.guests = this.guests.filter(findGuest => findGuest !== guest);
    console.log(this.guests);
  }

  public findGuestCheckinByNameDocumentOrPhone(text: string): Observable<Guest[]> {
    return of(this.guests
      .filter(guest => (guest.name.includes(text)
        || guest.phone.includes(text)
        || guest.document.includes(text))));
  }

  findGuestById(id: string): Observable<Guest> {
    return of(this.guests.find(guest => guest.id === id));
  }

}
