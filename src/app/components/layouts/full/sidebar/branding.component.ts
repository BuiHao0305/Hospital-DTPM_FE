import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
        <img
          src="assets/images/logos/logo.png"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
  styles: [
    `
      .branding {
        text-align: center;
        padding: 10px; 
      }
      .branding img { 
        display: block;
        max-width: 100%;
        height: auto;
        width: 150px;
        border-radius: 8px; 
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      }
    `,
  ],
})
export class BrandingComponent {
  constructor() {}
}
