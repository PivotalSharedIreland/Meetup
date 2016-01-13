import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Meetup} from './meetup-module';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class MeetupService implements Meetup.Provider {
    constructor(public http:Http) {}

    getList(city:string, countryCode:string):Observable<any> {
        return this.http.get(`http://localhost:8080/meetups?city=${city}&countryCode=${countryCode}`)
            .map(data => {
                return JSON.parse(data.text()).map((o) => Meetup.Model.fromObject(o));
            });
    };
}
