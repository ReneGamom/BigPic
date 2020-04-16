import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './events/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event.component';
import {Error404Component} from './errors/404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';

const routes: Routes = [
  { path: 'events/new',component:CreateEventComponent},// route pour une nouvelle page
  { path: 'events', component:EventsListComponent},
  { path: 'events/:id', component:EventDetailsComponent,canActivate:[EventRouteActivator]},// chemin avec id de tyne numeric ou string
  { path: '404', component:Error404Component},
  { path: '', redirectTo:'/events',pathMatch:'full'}//chemin par defaut au cas ou il est vide
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
