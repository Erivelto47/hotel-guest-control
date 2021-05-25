import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from './guest';
import { GuestService } from './guest.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  guests: Observable<Guest[]>;

  constructor(private guestService: GuestService) {
  }

  ngOnInit(): void {

    this.guests = this.guestService.getAll();
  }

}
