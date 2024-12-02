import { Routes } from '@angular/router';
import { BlankComponent } from './components/layouts/blank/blank.component';
import { FullComponent } from './components/layouts/full/full.component';
import { DashboardComponent } from './components/pages/ui-components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
     
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./components/pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
     
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./components/pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
