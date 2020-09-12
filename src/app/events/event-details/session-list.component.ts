import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/index';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styles: ['collapsible-well h6 {margin-top:-5px; margin-bottom:10px;}'],
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  visibleSessions: ISession[] = [];
  @Input() sortBy: string;
  @Input() eventId: number;
  constructor(public auth: AuthService, public voterService: VoterService) {}

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name'
        ? this.visibleSessions.sort(this.sortByNameAsc)
        : this.visibleSessions.sort(this.sortByVotesDesc);
    }

    // console.log(`from on change   ${this.auth.currentUser.userName}`);
    // console.log(`from on change ${this.sessions.values}`);
  }

  toggleVote(session: ISession) {
    // console.log(`vote: ${session.name} `);
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    }
    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(this.sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    // console.log(`from user Vited  ${session.voters} `);
    return this.voterService.userHasVoted(
      session,
      this.auth.currentUser.userName
    );
  }

  filterSessions(filter) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter((session) => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }

  sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) {
      return 1;
    } else if (s1.name === s2.name) {
      return 0;
    } else {
      return -1;
    }
  }
  sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
  }
}
