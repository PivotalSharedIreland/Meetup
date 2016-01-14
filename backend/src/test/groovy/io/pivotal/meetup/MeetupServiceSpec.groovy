package io.pivotal.meetup

import com.meetup.api.Event
import com.meetup.api.Group
import com.meetup.api.MeetupClient
import com.meetup.api.Meta
import com.meetup.api.OpenEventsResult
import io.pivotal.meetup.events.FindMeetupsRequest
import io.pivotal.meetup.events.MeetupService
import spock.lang.Specification

class MeetupServiceSpec extends Specification {
    def meetupService

    void setup() {
        meetupService = new MeetupService(meetupClient: Mock(MeetupClient))
    }

    def "should find meetups"() {
        given:
        def request = new FindMeetupsRequest(city: city, state: state, countryCode: country)
        def meetup = new Event(name: 'First Meetup', description: 'Meetup description', time: new Date(2015, 1, 1),
                group: new Group(urlName: 'url1'))

        when:
        def meetups = meetupService.findMeetups(request)

        then:
        if (state == null) {
            1 * meetupService.meetupClient.findOpenEvents(city, country) >> {
                new OpenEventsResult(results: [meetup], meta: new Meta(totalCount: 1))
            }
        } else {
            1 * meetupService.meetupClient.findOpenEvents(city, state, country) >> {
                new OpenEventsResult(results: [meetup], meta: new Meta(totalCount: 1))
            }
        }

        meetups.size() == 1
        meetups[0].id == meetup.id
        meetups[0].name == meetup.name
        meetups[0].description == meetup.description
        meetups[0].urlName == meetup.group.urlName


        where:
        city | state | country
        'M'  | 'N'   | 'O'
        'M'  | null  | 'O'

    }

    def "should return null if no events found"() {
        when:
        def meetups = meetupService.findMeetups(new FindMeetupsRequest(city: 'Dublin', countryCode: 'IE'))

        then:
        1 * meetupService.meetupClient.findOpenEvents('Dublin', 'IE') >> {
            new OpenEventsResult(results: [], meta: new Meta(totalCount: 0))
        }
        meetups == null
    }

    def "should return a specific event"() {

        given:
        def eventId = '227782967'
        def urlName = 'The-Dublin-French-Meetup-Group'
        def event = new Event(id: eventId, group: new Group(urlName: urlName))

        when:
        def specificMeetup = meetupService.findMeetup(urlName, eventId);

        then:
        1 * meetupService.meetupClient.findEvent(urlName, eventId) >> {
            event
        }

        specificMeetup.id == event.id
        specificMeetup.description == event.description
        specificMeetup.name == event.name
        specificMeetup.time == event.time
        specificMeetup.urlName == event.group.urlName
    }

    def "should handle null event"() {

        given:
        def eventId = '227782967'
        def urlName = 'The-Dublin-French-Meetup-Group'
        def event = new Event(id: eventId, group: new Group(urlName: urlName))

        when:
        def specificMeetup = meetupService.findMeetup(urlName, eventId);

        then:
        1 * meetupService.meetupClient.findEvent(urlName, eventId) >> {
            null
        }

        specificMeetup == null
    }

}
