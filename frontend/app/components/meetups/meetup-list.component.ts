import {Component, Inject} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Meetup} from './meetup-model';
import {MeetupService} from './meetup-service';
import {NgFor} from 'angular2/common';
import {Observable} from 'rxjs/Observable';


export interface MeetupProvider {
  getList(city: string, country: string) : Observable<Meetup[]>;
}

export interface Parameters {
  get(param: string): string;
}

@Component({
  selector: 'meetup-list',
  templateUrl: 'components/meetups/list.html',
  providers: [MeetupService],
  inputs: ['meetupList'],
  directives: [NgFor]
})
export class MeetupListComponent {
  public meetupList:Meetup[];

  constructor(
    @Inject(RouteParams) private _params:Parameters,
    @Inject(MeetupService) private meetupProvider:MeetupProvider
  ) {

    this.meetupProvider.getList(this._params.get('city'), this._params.get('countryCode'))
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
