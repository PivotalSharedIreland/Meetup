import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {MeetupSearchComponent} from '../meetups/meetup-search.component';
import {MeetupListComponent} from '../meetups/meetup-list.component';

@Component({
  directives: [MeetupSearchComponent,ROUTER_DIRECTIVES],
  selector: 'meetup-app',
  templateUrl: 'components/app/meetup.html'
})

@RouteConfig([
  {path: '/', name: 'Search', component: MeetupSearchComponent},
  {path: '/list', name: 'List', component: MeetupListComponent}
])
export class AppComponent { }
