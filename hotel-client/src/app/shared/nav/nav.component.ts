import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  items: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Guest',
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
        ]
      }
    ];
  }

}
