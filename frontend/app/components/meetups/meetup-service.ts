import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class MeetupService {
    constructor(public http:Http) {}

    getList(city:string, countryCode:string) {
        return this.http.get(`http://localhost:8080/meetups?city=${city}&countryCode=${countryCode}`);
    }
}