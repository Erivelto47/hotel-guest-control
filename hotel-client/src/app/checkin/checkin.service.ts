import {Injectable} from '@angular/core';
import {Checkin} from './checkin';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  checkin: Checkin;

  checkinList: Checkin[];

  constructor() {
    this.checkinList = [{
      id: '4123124',
      checkin: new Date(),
      checkout: null,
      total: 0,
      laststay: 200,
      guest: {
        id: 'ksjdjoaisdjjfa',
        name: 'teste2',
        lastname: 'teste22',
        document: '9712390g',
        phone: '32887723322',
        email: 'teste2@teste.com',
      },
    }];
  }

  public findAll(): Observable<Checkin[]> {
    return of(this.checkinList);
  }

  updateCheckin(checkin: Checkin): Observable<Checkin> {

    return new Observable<Checkin>();
  }

  addCheckin(checkin: Checkin): Observable<Checkin> {
    this.checkinList.push(checkin);
    return of(checkin);
  }
}
