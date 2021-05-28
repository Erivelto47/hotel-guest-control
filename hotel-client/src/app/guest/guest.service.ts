import {Injectable} from '@angular/core';
import {Guest} from './guest';
import {Observable, of} from 'rxjs';

import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

const URL_API_GUEST = environment.API_ENDPOINT + '/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<Guest[]> {
    return this.httpClient.get<Guest[]>(URL_API_GUEST);
  }

  public addGuest(guest: Guest): Observable<Guest> {
    return this.httpClient.post<Guest>(URL_API_GUEST, guest);
  }

  public updateGuest(guest: Guest): Observable<Guest> {
    return this.httpClient.post<Guest>(URL_API_GUEST, guest);
  }

  public removeGuest(guest: Guest): Observable<void> {
    return this.httpClient.delete<void>(`${URL_API_GUEST}/${guest.id}`);
  }

}
