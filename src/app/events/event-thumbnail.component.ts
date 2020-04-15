import { Component, Input, Output,EventEmitter } from '@angular/core'

@Component({
    selector:'event-thumbnail',
    template:`<div class="well hoverwall thumbnail">
    <h2>{{event?.name}}</h2>
        <div>Date:{{event?.date}}</div>
        <div [ngStyle]="getStartTimeStyle()" [ngClass]="getStartTimeClassStr()" [ngSwitch]="event?.time">Time:{{event?.time}}
        <span *ngSwitchCase="'8:00 am'" id="earlier"> <strong>(Early Start)</strong></span>
        <span *ngSwitchCase="'10:00 am'" id="lately"> <strong>(Late Start)</strong></span>
        <span *ngSwitchDefault id="normaly"> <strong>(Normal Start)</strong></span>
        </div>       
        <div>Price:\${{event?.price}}</div>
        <div *ngIf="event?.location">
        <span><strong>Location:</strong>{{event?.location?.address}}</span>
        <span class="pad-left">{{event?.location?.city}},
        {{event?.location?.country}}</span>
        </div>
        <div *ngIf="event?.onlineUrl">
        Online URL:{{event?.onlineUrl}}
        </div>
</div>
`,
styles: [`
.green {color:#003300 !important;}
.bold { font-weight:bold; }
.thumbnail {min-height:210px;}
.pad-left { margin-left:10px;}
.well div {color:#bbb;}
 #lately {color:red; background:black;}
 #normaly {color:yellow; background:black;}
`]
})

export class EventThumbnailComponent{
@Input() event:any
someProperty:any="Some Value"
@Output() eventClick=new EventEmitter()

handleClickMe(){
   console.log('clicked !')

   this.eventClick.emit(this.event.name)
        }

    logFoo(){
        console.log('foo')
    }

    // methode ngClass retournant un object
    getStartTimeClass(){
    const isEarlyStart=this.event && this.event.time==='8:00 am'
    return {green:isEarlyStart,bold:isEarlyStart}

    }

    // methode ngClass  pour retourner une chaine de caractere.
    getStartTimeClassStr(){
        if (this.event && this.event.time==='8:00 am')
        return 'green bold'
    return ''
    }

    // methode ngClass pour retourner un tableau
    getStartTimeClassStrTab(){
        if (this.event && this.event.time==='8:00 am')
        return ['green', 'bold']
    return []
    }

    // methode ngStyle  pour application de styles
    getStartTimeStyle(){
        if (this.event && this.event.time==='8:00 am')
        return {color:'#003300','font-weight':'bold'}
    return {}
    }
}
