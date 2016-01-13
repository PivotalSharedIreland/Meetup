import {
  beforeEachProviders,
  describe,
  it,
  fit,
  injectAsync,
  expect,
  TestComponentBuilder
} from 'angular2/testing';
import {Observable} from 'rxjs/Observable';
import {provide} from 'angular2/core';
import {MeetupListComponent} from './meetup-list.component';
import {MeetupService} from './meetup-service';
import {Meetup} from './meetup-model';
import {RouteParams} from 'angular2/router';

class MockMeetupService extends MeetupService {
  getList(city:string, countryCode:string) {
    var meetupList = [new Meetup('1', 'meetup 1', 'cool meetup', 'meetup.example.com', new Date())];
    return Observable.create(function (subscriber) {
      subscriber._next(meetupList);
      subscriber._complete();
    });
  }
}

class MockParameters extends RouteParams {
  get(param:string):string {
    return param;
  }
}

export function main() {
  describe('Meetup List component', () => {
    beforeEachProviders(() => [
        provide(MeetupService, {useValue: new MockMeetupService(null)}),
        provide(RouteParams, {useClass: MockParameters})
      ]
    );

    it('display meetup list', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(MeetupListComponent).then((fixture) => {
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('li').innerHTML).toContain('meetup.example.com');
      });
    }));

  });
}
