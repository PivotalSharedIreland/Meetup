import {
  it,
  describe,
  expect,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';
import {MeetupSearchComponent} from './meetup-search.component';
import {Router} from 'angular2/router';
import {geography} from './meetup-geography';
import {provide} from 'angular2/core';

describe('Meetup Search component', () => {
  var component, mockNavigator;

  beforeEach(() => {
    mockNavigator = jasmine.createSpyObj('navigator', ['navigate']);

    component = new MeetupSearchComponent(mockNavigator);
  });

  it('correctly sets countries', () => {
    expect(component.countryCodes).toEqual(geography.countries);
  });

  describe('Meetup search component integration', () => {

    beforeEachProviders(() => [
      provide(Router, {useValue: mockNavigator})
    ]);

    it('display meetup list', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(MeetupSearchComponent).then((fixture) => {
        fixture.detectChanges();
        fixture.componentInstance.countryIndex = 2;
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelector('select#state')).toHaveCssClass('dropdown');
      });
    }));

    it('hides state select when stateList empty', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(MeetupSearchComponent).then((fixture) => {
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('select#state').hidden).toEqual(true);
      });
    }));

    it('hides state select when stateList not empty', injectAsync([TestComponentBuilder], (tcb) => {
      return tcb.createAsync(MeetupSearchComponent).then((fixture) => {
        fixture.detectChanges();
        fixture.componentInstance.stateList = [
          {name: 'Agrigento', iso_code: 'AG'},
          {name: 'Alessandria', iso_code: 'AL'},
          {name: 'Ancona', iso_code: 'AN'},
          {name: 'Aosta', iso_code: 'AO'}
        ]
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('select#state')).toBeTruthy();
      });
    }));

    describe('onSubmit', () => {
      it('calls the navigator', () => {
        component.city = 'Dublin';
        component.countryIndex = 0;

        component.onSubmit('city', 'state', 'countryCode');

        expect(mockNavigator.navigate).toHaveBeenCalledWith(['List', {
          city: 'city',
          countryCode: 'countryCode',
          state: 'state'
        }]);
      });
    });
  });
});
