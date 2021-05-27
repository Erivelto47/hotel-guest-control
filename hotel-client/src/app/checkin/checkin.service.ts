import {Injectable} from '@angular/core';
import {Checkin} from './checkin';
import {Observable, of} from 'rxjs';
import {GuestService} from '../guest/guest.service';
import {Filter} from '../shared/common/Filter';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  checkin: Checkin;

  checkinList: Checkin[];

  constructor(private guestService: GuestService) {
    this.checkinList = [{
      id: '4123124',
      checkin: new Date(),
      checkout: null,
      total: 0,
      guest: {
        id: 'ksjdjoaisdjjfa',
        name: 'teste2',
        lastname: 'teste22',
        document: '9712390g',
        phone: '32887723322',
        email: 'teste2@teste.com',
      }
    },
      {
        id: '3214234',
        checkin: new Date(),
        checkout: new Date(),
        total: 2391.89,
        guest: {
          id: 'ksjdjoaisdfdsfa',
          name: 'teste3',
          lastname: 'teste33',
          document: '9712390gf87s',
          phone: '32887723123',
          email: 'teste3@teste.com',
        }
      },
      {
        id: '3214214',
        checkin: new Date(),
        checkout: null,
        total: 0,
        guest: {
          id: 'ksjdjoaisdfdsfa',
          name: 'teste3',
          lastname: 'teste33',
          document: '9712390gf87s',
          phone: '32887723123',
          email: 'teste3@teste.com',
        }
      }
    ];
  }

  public findAll(): Observable<Checkin[]> {
    return of(this.checkinList);
  }

  updateCheckin(checkin: Checkin): Observable<Checkin> {

    this.checkinList[this.checkinList.findIndex(oldCheckin => oldCheckin.id === checkin.id)] = checkin;
    return of(this.checkinList.find(checkinFilter => checkinFilter.id === checkin.id));
  }

  addCheckin(checkin: Checkin): Observable<Checkin> {
    this.checkinList.push(checkin);
    return of(checkin);
  }

  findFiltered(filter: Filter): Observable<Checkin[]> {
    const checkins: Checkin[] = [];

    this.checkinList.filter(checkin => {
      if (checkin.guest.name === filter.name
        || checkin.guest.document === filter.document
        || checkin.guest.phone === filter.phone
        || ((filter.situation === 'in' && checkin.checkout === null)  || (filter.situation === 'out' && checkin.checkout))) {
        checkins.push(checkin);
      }
    });

    return of(checkins);
  }
}
