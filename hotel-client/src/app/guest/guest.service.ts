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
        name: "teste1",
        lastname: "teste11",
        document: "9712390f",
        phone: "32887723321",
      },
      {
        name: "teste2",
        lastname: "teste22",
        document: "9712390g",
        phone: "32887723322",
      }
    ]
  }

  public getAll(): Observable<Guest[]> {
    return of(this.guest);
  }

  public addGuest(guest: Guest) {
    this.guest.push(guest)
  }

  public removeGuest(guest: Guest) {
    this.guest = this.guest.filter(findGuest => findGuest !== guest)
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
}
