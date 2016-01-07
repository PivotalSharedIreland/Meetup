import {Component} from 'angular2/core';
import {MeetupSearchComponent} from '../meetups/meetup-search.component';

@Component({
    directives: [MeetupSearchComponent],
    selector: 'meetup-app',
    templateUrl: 'components/app/meetup.html'
})
export class AppComponent { }
