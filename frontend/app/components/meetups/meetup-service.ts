import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import {Meetup} from './meetup-module';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MeetupService implements Meetup.Provider {
  constructor(public http:Http) {
  }

  getList(city:string, countryCode:string):Observable<any> {
    let queryParams = new URLSearchParams();
    queryParams.set('city', city);
    queryParams.set('countryCode', countryCode) ;

    return this.http.get('http://localhost:8080/meetups', {search: queryParams})
      .map(data => {
        return JSON.parse(data.text()).map((o) => Meetup.Model.fromObject(o));
      });
  };
}
