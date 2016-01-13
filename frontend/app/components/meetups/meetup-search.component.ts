import {Component, Inject} from 'angular2/core';
import {Meetup} from './meetup-module';
import {MeetupListComponent} from './meetup-list.component';
import {Router} from 'angular2/router';

interface Navigator {
  navigate(linkParams:any[]);
}

@Component({
  selector: 'meetup-search',
  templateUrl: 'components/meetups/search.html',
  providers: [],
  directives: [MeetupListComponent]
})
export class MeetupSearchComponent {

  constructor(@Inject(Router) private navigator:Navigator) {
    this.countryCode = 'IE';

    this.countryCodes = [
      {name: 'Ireland', iso_code: 'IE'},
      {name: 'Italy', iso_code: 'IT'}
    ];
  };

  result:Meetup.Model[];
  city:string;
  countryCode:string;
  countryCodes:any[];

  onSubmit() {
    this.navigator.navigate(['List', {city: this.city, countryCode: this.countryCode}]);
  }
}
