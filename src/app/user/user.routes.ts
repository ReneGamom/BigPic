import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';

export const userRoutes = [
  { path: 'profile', component: ProfileComponent },
  // la route sera
  // /user/profile
  {
    path: 'login',
    component: LoginComponent,
  },
];
