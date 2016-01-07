import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Meetup} from './meetup-model';

@Injectable()
export class MeetupService {
    constructor(public http:Http) {}

    getList(city:string, countryCode:string) {
        return this.http.get(`http://localhost:8080/meetups?city=${city}&countryCode=${countryCode}`)
            .map(data => {
                return JSON.parse(data.text()).map((o) => Meetup.fromObject(o));
            });
    };
}
