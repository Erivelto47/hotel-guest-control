import {Injectable} from '@angular/core';
import {Checkin} from './checkin';
import {Observable} from 'rxjs';
import {Filter} from '../shared/common/Filter';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

const URL_API_CHECKIN = environment.API_ENDPOINT + '/checkin';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  checkin: Checkin;

  constructor(private httpClient: HttpClient) {
  }

  public findAll(): Observable<Checkin[]> {
    return this.httpClient.get<Checkin[]>(URL_API_CHECKIN);
  }

  updateCheckin(checkin: Checkin): Observable<Checkin> {
    return this.httpClient.post<Checkin>(URL_API_CHECKIN, checkin);
  }

  addCheckin(checkin: Checkin): Observable<Checkin> {
    return this.httpClient.post<Checkin>(URL_API_CHECKIN, checkin );
  }

  findFiltered(filter: Filter): Observable<Checkin[]> {
    return this.httpClient.post<Checkin[]>(URL_API_CHECKIN + '/filter', filter);
  }

  delete(checkin: Checkin): Observable<void> {
    return this.httpClient.delete<void>(`${URL_API_CHECKIN}/${checkin.id}`);
  }
}
