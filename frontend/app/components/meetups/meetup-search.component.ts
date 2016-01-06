import {Component} from 'angular2/core';
import {MeetupService} from './meetup-service';
import {Meetup} from "./meetup-model";
import {MeetupListComponent} from "./meetup-list.component";

@Component({
    selector: 'meetup-search',
    templateUrl: 'app/components/meetups/search.html',
    providers: [MeetupService],
    directives: [MeetupListComponent]
})
export class MeetupSearchComponent {

    constructor(private meetupService:MeetupService) {}

    result:Meetup[];
    city:string;
    countryCode:string;


    onSubmit() {
        this.meetupService.getList(this.city, this.countryCode)
            .subscribe(
                meetups => {
                    this.result = meetups;
                },
                err => {
                    console.log(err);
                    this.result = [];
                },
                () => console.log('Meetup results loaded')
            );
    }
}