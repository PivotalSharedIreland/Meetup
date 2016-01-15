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

describe('meetup list component', () => {
  var mockMeetupProvider, mockParameters, meetupListSubscriber, meetupList;

  beforeEach(() => {
    meetupList = [new Meetup.Model('1', 'meetup 1', 'cool meetup', 'meetup.example.com', new Date())];

    mockMeetupProvider = jasmine.createSpyObj('mockMeetupProvider', ['getList']);
    mockMeetupProvider.getList.and.returnValue(
      Observable.create((subscriber) => {
        meetupListSubscriber = subscriber;
      })
    );

    mockParameters = jasmine.createSpyObj('mockParameters', ['get']);
    mockParameters.get.and.callFake((param:string) => param);
  });

  describe('Meetup List component integration', () => {

    beforeEachProviders(() => [
        provide(MeetupService, {useValue: mockMeetupProvider}),
        provide(RouteParams, {useValue: mockParameters})
      ]
    );

    it('display meetup list', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(MeetupListComponent).then((fixture) => {

        meetupListSubscriber.next(meetupList);

        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('li').innerHTML).toContain('meetup.example.com');
      });
    }));
  });

  describe('get meetup list', () => {
    var component;

    beforeEach(() => {
      component = new MeetupListComponent(mockParameters, mockMeetupProvider);
    });

    describe('meetup list component success', function () {
      it('should find meetup list', () => {
        expect(component.meetupList).toEqual(undefined);

        meetupListSubscriber.next(meetupList);

        expect(component.meetupList).toEqual(meetupList);
        expect(mockMeetupProvider.getList).toHaveBeenCalledWith('city', 'countryCode', 'state');
      });
    });

    describe('empty meetup list component', function () {
      it('should return an empty meetup list', () => {
        meetupListSubscriber.error('ERROR: THIS WILL BE LOGGED!');

        expect(component.meetupList).toEqual([]);
        expect(mockMeetupProvider.getList).toHaveBeenCalledWith('city', 'countryCode', 'state');
      });
    });
  });
});
