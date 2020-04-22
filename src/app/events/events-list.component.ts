import {Component} from '@angular/core'
import { EventService } from './shared/event.service';
import { NotificationService } from '../notification.service';
import { Toast } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router'

@Component({
    template:`<div>
    <h1>Upcoming Angular Events</h1>
    <hr>
        <div class="row">
            <div *ngFor="let event of events" class="col-md-5">
            <event-thumbnail  [event]="event">
            </event-thumbnail>
            </div>
        </div>
       
    </div>
`  
})
export class EventsListComponent {
    events:any
    constructor(private eventService:EventService,
        private notifyService : NotificationService,
        private route:ActivatedRoute){

    }
    ngOnInit(){
/*         this.eventService.getEvents().subscribe(events=>{this.events=events})
 */    
        this.events=this.route.snapshot.data['events']
}
   
    title = 'toaster-not';
  
  
  showToasterSuccess(eventName){
      this.notifyService.showSuccess("Data shown successfully !!", eventName)
  }
  
  showToasterError(eventName){
      this.notifyService.showError("Something is wrong", eventName)
  }
  
  showToasterInfo(eventName){
      this.notifyService.showInfo("This is info", eventName)
  }
  
  showToasterWarning(eventName){
      this.notifyService.showWarning("This is warning", eventName)
  }
}
