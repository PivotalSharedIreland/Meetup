import {Component, Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Meetup} from './meetup-module';
import {MeetupService} from './meetup-service';
import {NgFor} from 'angular2/common';

@Component({
  selector: 'meetup-list',
  templateUrl: 'components/meetups/list.html',
  inputs: ['meetupList'],
  directives: [NgFor]
})
export class MeetupListComponent {
  public meetupList:Meetup.Model[];

  constructor(@Inject(RouteParams) private _params:Meetup.Parameters,
              @Inject(MeetupService) private meetupProvider:Meetup.Provider) {

    this.meetupProvider.getList(this._params.get('city'), this._params.get('countryCode'), this._params.get('state'))
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
