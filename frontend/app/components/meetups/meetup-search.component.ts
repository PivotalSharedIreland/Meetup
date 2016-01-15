import {Component, Inject} from 'angular2/core';
import {Meetup} from './meetup-module';
import {MeetupListComponent} from './meetup-list.component';
import {Router} from 'angular2/router';
import {geography} from './meetup-geography';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';

interface Navigator {
  navigate(linkParams:any[]);
}



@Component({
  selector: 'meetup-search',
  templateUrl: 'components/meetups/search.html',
  directives: [MeetupListComponent, FORM_DIRECTIVES, CORE_DIRECTIVES, ]
})
export class MeetupSearchComponent {
  countryCodes:any[];
  stateList:any[];

  constructor(@Inject(Router) private navigator:Navigator) {
    this.countryCodes = geography.countries;
  };

  updateStateList(countryCode:string) {
    let country = this.countryCodes.find((country) => country.iso_code === countryCode);
    this.stateList = country.states;
  }

  onSubmit(city:string, stateCode:string, countryCode:string) {
    this.navigator.navigate(['List', {city: city, countryCode: countryCode, state: stateCode}]);
  }
}
