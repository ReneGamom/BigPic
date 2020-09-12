// import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router"
// import { Injectable } from "@angular/core"
// import { EventService } from '../shared/event.service'

// @Injectable()
// export class EventRouteActivator implements CanActivate{
//     constructor(private eventService:EventService,private router:Router){

//     }

//     canActivate(route: ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean |
//     import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
//     | Promise<boolean | import("@angular/router").UrlTree> {
//         const eventExists=!!this.eventService.getEvent(+route.params['id']);
//      //console.log(+route.params['id']);

//      if (!eventExists)
//      this.router.navigate(['/404']);
//      return eventExists;
//     }
// }
