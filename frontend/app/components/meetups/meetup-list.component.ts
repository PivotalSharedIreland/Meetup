import {Component} from 'angular2/core';
import {Meetup} from './meetup-model';
import {RouteParams} from 'angular2/router';
import {MeetupService} from './meetup-service';

@Component({
  selector: 'meetup-list',
  templateUrl: 'components/meetups/list.html',
  providers: [MeetupService],
  inputs: ['meetupList']
})
export class MeetupListComponent {
  public meetupList:Meetup[];
  constructor(private _params:RouteParams, private meetupService:MeetupService) {

    // go to list sending data
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
