import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared';

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
  event:any
  isDirty: boolean = true;
  constructor(private route: Router, private eventService: EventService) {}
  ngOnInit(){
    this.event={
        name:'ng Spectacular Events',
        date:'8/8/2028',
        time:'10am',
        price:799.99,
        location:{
            address:'456 Happy st',
            city:'Felicity',
            country:'Angularistan',
        },
        onlineUrl:'http://ngSpectacular.com',
        imageUrl:'http://ngSpectacular.com/logo.png'
    }
  }

  cancel() {
    this.route.navigate(['/events']);
  }
  saveEvent(formValues) {
    // console.log(formValues);
    this.isDirty = false;
    this.eventService.saveEvent(formValues);
    this.route.navigate(['/events']);
  }
}
