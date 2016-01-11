import {Component} from 'angular2/core';
import {Meetup} from './meetup-model';
import {MeetupListComponent} from './meetup-list.component';
import {Router} from 'angular2/router';

@Component({
  selector: 'meetup-search',
  templateUrl: 'components/meetups/search.html',
  providers: [],
  directives: [MeetupListComponent]
})
export class MeetupSearchComponent {

  constructor(private _router:Router) {
    this.countryCode = 'IE';
    this.initCountryCodes();
  };

  result:Meetup[];
  city:string;
  countryCode:string;
  countryCodes:any[];


  onSubmit() {
    this._router.navigate(['List', {city: this.city, countryCode: this.countryCode}]);
  }

  initCountryCodes() {
    this.countryCodes = [
      {name: 'Ireland', iso_code: 'IE'},
      {name: 'Italy', iso_code: 'IT'}
    ];
  }
}
