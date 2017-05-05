import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CreateTaskComponent } from './create-task';
import { InTasksComponent } from './in-tasks';
import { OutTasksComponent } from './out-tasks';
import { ProfileComponent } from './profile';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'tasks', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'tasks', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'in', pathMatch: 'full' },
      { path: 'in', component: InTasksComponent },
      { path: 'out', component: OutTasksComponent }
    ]
  },
  { path: 'create', component: CreateTaskComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const rootRouterConfig = RouterModule.forRoot(routes);
