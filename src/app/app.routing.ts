import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LoginComponent } from './login';
import { CreateTaskComponent } from './create-task';
import { InTasksComponent } from './in-tasks';
import { OutTasksComponent } from './out-tasks';

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
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateTaskComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const rootRouterConfig = RouterModule.forRoot(routes);
