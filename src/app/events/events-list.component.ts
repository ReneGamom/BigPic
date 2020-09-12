import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { NotificationService } from '../notification.service';
import { Toast } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/index';

@Component({
  template: `<div>
    <h1>Upcoming Angular Events</h1>
    <hr />
    <div class="row">
      <div *ngFor="let event of events" class="col-md-5">
        <event-thumbnail [event]="event"> </event-thumbnail>
      </div>
    </div>
  </div> `,
})
export class EventsListComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private notifyService: NotificationService,
    private route: ActivatedRoute
  ) {}
  events: IEvent[];

  title = 'toaster-not';

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });

    // tslint:disable-next-line: no-string-literal
    this.events = this.route.snapshot.data['events'];
  }

  showToasterSuccess(eventName) {
    this.notifyService.showSuccess('Data shown successfully !!', eventName);
  }

  showToasterError(eventName) {
    this.notifyService.showError('Something is wrong', eventName);
  }

  showToasterInfo(eventName) {
    this.notifyService.showInfo('This is info', eventName);
  }

  showToasterWarning(eventName) {
    this.notifyService.showWarning('This is warning', eventName);
  }
}
