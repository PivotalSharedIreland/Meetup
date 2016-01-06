import {Component} from 'angular2/core';
import {MeetupSearchComponent} from './components/meetups/meetup-search.component';

@Component({
    directives: [MeetupSearchComponent],
    selector: 'meetup-app',
    templateUrl: 'app/meetup.html'
})
export class AppComponent { }
