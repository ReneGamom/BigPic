import { NgModule } from '@angular/core';
import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
} from './events/index';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';

const routes: Routes = [
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'],
  }, // route pour une nouvelle page
  {
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventListResolver },
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    canActivate: [EventRouteActivator],
  }, // chemin avec id de tyne numeric ou string
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' }, //chemin par defaut au cas ou il est vide

  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  // configuration de la route du nouveau module.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
