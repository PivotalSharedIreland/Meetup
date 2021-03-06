import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './components/app/app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MeetupService} from './components/meetups/meetup-service';
import 'rxjs/Rx';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  MeetupService,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
