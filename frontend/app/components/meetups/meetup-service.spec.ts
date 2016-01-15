import {describe, beforeEachProviders, it, fit, inject}  from 'angular2/testing';
import {provide} from 'angular2/core';
import {Http, BaseRequestOptions, ResponseOptions, Response} from 'angular2/http';

import {MockBackend} from 'angular2/http/testing';
import {MeetupService} from './meetup-service';

describe('Meetup Service', () => {
  beforeEachProviders(() => [
      MockBackend,
      BaseRequestOptions,
      provide(
        Http,
        {
          useFactory: ((backend, defaultOptions) => new Http(backend, defaultOptions)),
          deps: [MockBackend, BaseRequestOptions]
        }
      ),
      MeetupService
    ]
  );

  //fit('should get meetup list with state', inject(
  //    [MeetupService, MockBackend],
  //    (meetupService, mockBackend) => {
  //      let response = JSON.stringify([{
  //        'id': '227604742',
  //        'name': 'Grace, passion, and death.',
  //        'description': 'Description Sample',
  //        'time': 1452787200000,
  //        'urlName': 'DublinStartups'
  //      }]);
  //      let responseOptions = new ResponseOptions({body: response});
  //
  //      var connection;
  //      mockBackend.connections.subscribe((c) => connection = c);
  //      var observable = meetupService.getList('city', 'country', 'state');
  //
  //      connection.mockRespond(new Response(responseOptions));
  //
  //      console.log(observable);
  //
  //
  //      observable.subscribe((response) => {
  //
  //        console.log('∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫∫');
  //
  //        expect(response.text()).toEqual(100000);
  //      });
  //    }));

  //it('should get meetup list without state', () => {
  //
  //})

});
