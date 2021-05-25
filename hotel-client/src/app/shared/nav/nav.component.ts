import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  items: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Hóspedes',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Cadastro',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: 'guest'
          },
          {
            separator: true
          },
          {
            label: 'Checkin',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: 'checkin'
          },
          {
            separator: true
          },
          {
            label: 'Checkout',
            icon: 'pi pi-fw pi-sign-out',
            routerLink: 'checkout'
          }
        ]
      }
    ];
  }

}
