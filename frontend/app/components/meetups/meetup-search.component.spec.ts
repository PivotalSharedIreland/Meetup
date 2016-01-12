import { it, describe, expect } from 'angular2/testing';
import {MeetupSearchComponent} from './meetup-search.component';

describe('Meetup Search component', () => {
  var component, mockNavigator;

  beforeEach(() => {
    mockNavigator = jasmine.createSpyObj('navigator', ['navigate']);

    component = new MeetupSearchComponent(mockNavigator);
  });

  it('correctly sets countryCodes', () => {
    expect(component.countryCodes).toEqual([{name: 'Ireland', iso_code: 'IE'}, {name: 'Italy', iso_code: 'IT'}]);
  });

  it('correctly sets countryCode', () => {
    expect(component.countryCode).toEqual('IE');
  });

  describe('onSubmit', () => {
    it('calls the navigator', () => {
      component.city = 'London';
      component.countryCode = 'UK';

      component.onSubmit();

      expect(mockNavigator.navigate).toHaveBeenCalledWith(['List', {city: 'London', countryCode: 'UK'}]);
    });
  });
});
