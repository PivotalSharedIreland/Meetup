import {
  beforeEachProviders,
  describe,
  it,
  injectAsync,
  expect,
  TestComponentBuilder
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {MeetupListComponent} from './meetup-list.component';
import {Meetup} from './meetup-module';
import {RouteParams} from 'angular2/router';
import {MeetupService} from './meetup-service';


class MockMeetupService implements Meetup.Provider {
  getList(city:string, countryCode:string) {
    var meetupList = [new Meetup.Model('1', 'meetup 1', 'cool meetup', 'meetup.example.com', new Date())];
    return Observable.create(function (subscriber) {
      subscriber._next(meetupList);
      subscriber._complete();
    });
  }
}

class MockParameters implements Meetup.Parameters {
  get(param:string):string {
    return param;
  }
}

describe('meetup list component success', function () {
  describe('Meetup List component', () => {

    beforeEachProviders(() => [
        provide(MeetupService, {useValue: new MockMeetupService()}),
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
});


//describe('meetup list component success', function () {
//  var component, mockMeetupProvider, meetupList;
//
//  class MockParameters {
//    get(param: string) {
//      return param;
//    }
//  }
//
//  beforeEach(() => {
//    mockMeetupProvider = jasmine.createSpyObj('mockMeetupProvider', ['getList']);
//    meetupList = [new Meetup('1', 'meetup 1', 'cool meetup', 'meetup.example.com', new Date())];
//    mockMeetupProvider.getList.and.returnValue(
//      Observable.create(function (subscriber) {
//        subscriber._next(meetupList);
//        subscriber._complete();
//      })
//    );
//
//    var mockParameters = new MockParameters();
//    component = new MeetupListComponent(mockParameters, mockMeetupProvider);
//  });
//
//  it('should find meetup list', () => {
//    expect(component.meetupList).toEqual(meetupList);
//    expect(mockMeetupProvider.getList).toHaveBeenCalledWith('city', 'countryCode');
//  });
//
//});
//
//
//describe('empty meetup list component', function () {
//  var component, mockMeetupProvider, emptyMeetupList;
//
//  class MockParameters {
//    get(param: string) {
//      return param;
//    }
//  }
//
//  beforeEach(() => {
//    mockMeetupProvider = jasmine.createSpyObj('mockMeetupProvider', ['getList']);
//    emptyMeetupList = [];
//    mockMeetupProvider.getList.and.returnValue(
//      Observable.create(function (subscriber) {
//        subscriber._error('ERROR: THIS WILL BE LOGGED!');
//      })
//    );
//
//    var mockParameters = new MockParameters();
//    component = new MeetupListComponent(mockParameters, mockMeetupProvider);
//  });
//
//
//  it('should return an empty meetup list', () => {
//    expect(component.meetupList).toEqual(emptyMeetupList);
//    expect(mockMeetupProvider.getList).toHaveBeenCalledWith('city', 'countryCode');
//  });
//
//});
