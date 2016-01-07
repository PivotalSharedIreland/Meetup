import {Component} from 'angular2/core';
import {Meetup} from './meetup-model';

@Component({
    selector: 'meetup-list',
    templateUrl: 'components/meetups/list.html',
    inputs: ['meetupList']
})
export class MeetupListComponent {
    public meetupList: Meetup[];
}
