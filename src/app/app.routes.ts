import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "calendar", canActivate: [authGuard],  component: CalendarComponent },
  { path: "**", component: HomeComponent },
];
