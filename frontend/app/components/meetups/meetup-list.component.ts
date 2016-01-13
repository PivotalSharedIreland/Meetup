import {Component} from 'angular2/core';
import {Meetup} from './meetup-model';
import {RouteParams} from 'angular2/router';
import {MeetupService} from './meetup-service';
import {NgFor} from 'angular2/common';

@Component({
  selector: 'meetup-list',
  template: `
  <ul>
    <li *ngFor="#meetup of meetupList">
      <strong>{{meetup.time }}</strong> {{meetup.name}} - {{meetup.urlName}} - {{meetup.id}}
    </li>
  </ul>`,
  inputs: ['meetupList'],
  directives: [NgFor]
})
export class MeetupListComponent {
  public meetupList:Meetup[];
  constructor(private _params:RouteParams, private meetupService:MeetupService) {

    this.meetupService.getList(this._params.get('city'), this._params.get('countryCode'))
      .subscribe(
        meetups => {
          this.meetupList = meetups;
        },
        err => {
          console.log(err);
          this.meetupList = [];
        },
        () => console.log('Meetup results loaded')
      );
  }

}
