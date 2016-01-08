package io.pivotal.meetup

import com.meetup.api.Event
import com.meetup.api.Group
import com.meetup.api.DefaultMeetupClient
import com.meetup.api.MeetupClient
import com.meetup.api.Meta
import com.meetup.api.OpenEventsResult
import io.pivotal.meetup.events.FindMeetupsRequest
import io.pivotal.meetup.events.Meetup
import io.pivotal.meetup.events.MeetupService
import spock.lang.Specification

class MeetupServiceSpec extends Specification {

    def "should find meetups"() {
        given:
        MeetupService meetupService = new MeetupService(meetupClient: Mock(MeetupClient))

        when:
        List<Meetup> meetups = meetupService.findMeetups(new FindMeetupsRequest(city:'Dublin', countryCode: 'IE'))

        then:
        1 * meetupService.meetupClient.findOpenEventsByCityAndCountryCode('Dublin', 'IE') >> {

            new OpenEventsResult(results: [new Event(id: "1",
                    name: 'First Meetup',
                    description: 'First Meetup desc',
                    time: new Date(2016, 1, 1),
                    group: new Group(urlName: 'url1')),
                                           new Event(id: "2")], meta: new Meta(totalCount: 2))
        }

        meetups.size() == 2
        meetups[0].id == '1'
        meetups[0].name == 'First Meetup'
        meetups[0].description == 'First Meetup desc'
        meetups[0].urlName == 'url1'
        meetups[1].id == '2'
    }

    def "should return null if no events found"() {
        given:
        MeetupService meetupService = new MeetupService(meetupClient: Mock(MeetupClient))

        when:
        List<Meetup> meetups = meetupService.findMeetups(new FindMeetupsRequest(city:'Dublin', countryCode: 'IE'))

        then:
        1 * meetupService.meetupClient.findOpenEventsByCityAndCountryCode('Dublin', 'IE') >> {
            new OpenEventsResult(results: [], meta: new Meta(totalCount: 0))
        }
        meetups == null
    }

    def "should return a specific event"() {

        given:
        MeetupService meetupService = new MeetupService(meetupClient: Mock(MeetupClient))
        def eventId = '227782967'
        def urlName = 'The-Dublin-French-Meetup-Group'
        def event = new Event(id: eventId, group: new Group(urlName: urlName))

        when:
        Meetup specificMeetup = meetupService.findMeetup(urlName, eventId);

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
        MeetupService meetupService = new MeetupService(meetupClient: Mock(MeetupClient))
        def eventId = '227782967'
        def urlName = 'The-Dublin-French-Meetup-Group'
        def event = new Event(id: eventId, group: new Group(urlName: urlName))

        when:
        Meetup specificMeetup = meetupService.findMeetup(urlName, eventId);

        then:
        1 * meetupService.meetupClient.findEvent(urlName, eventId) >> {
            null
        }

        specificMeetup == null
    }

}
