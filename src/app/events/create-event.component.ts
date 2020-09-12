import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared';
import { NotificationService } from '../notification.service';

@Component({
  templateUrl: './create-event.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error::-moz-placeholder {
        color: #999;
      }
      .error:-moz-placeholder {
        color: #999;
      }
      .error:ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class CreateEventComponent {
  newEvent;
  event: any;
  isDirty = true;
  constructor(
    private route: Router,
    private eventService: EventService,
    private notifyService: NotificationService
  ) {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.event = {
      name: '',
      date: '',
      time: '',
      price: 0,
      location: {
        address: '',
        city: '',
        country: '',
      },
      onlineUrl: '',
      imageUrl: '',
    };
  }

  cancel() {
    this.route.navigate(['/events']);
  }
  saveEvent(formValues) {
    console.log(formValues);

    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.route.navigate(['/events']);
    });

    this.showToasterSuccess('save Events successfully.');
    this.route.navigate(['/events']);
  }
  showToasterSuccess(eventName) {
    this.notifyService.showSuccess('Exbil.Apps', eventName);
  }
}
