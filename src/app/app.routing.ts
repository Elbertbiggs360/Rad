import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LoginComponent } from './login';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const rootRouterConfig = RouterModule.forRoot(routes);
