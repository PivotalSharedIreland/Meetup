package io.pivotal.meetup

import com.meetup.api.Event
import com.meetup.api.MeetupClient
import com.meetup.api.Meta
import com.meetup.api.OpenEventsResult
import io.pivotal.meetup.events.FindMeetupRequest
import io.pivotal.meetup.events.Meetup
import io.pivotal.meetup.events.MeetupService
import spock.lang.Specification

class MeetupServiceSpec extends Specification {

    def "should find meetups"() {
        given:
        MeetupService meetupService = new MeetupService(meetupClient: Mock(MeetupClient))

        when:
        List<Meetup> meetups = meetupService.findMeetups(new FindMeetupRequest(city:'Dublin', countryCode: 'IE'))

        then:
        1 * meetupService.meetupClient.findOpenEventsByCityAndCountryCode('Dublin', 'IE') >> {
            new OpenEventsResult(results: [new Event(id: "1", name: 'First Meetup', description: 'First Meetup desc', time: new Date(2016, 1, 1)), new Event(id: "2")], meta: new Meta(totalCount: 2))
        }

        meetups.size() == 2
        meetups[0].id == '1'
        meetups[0].name == 'First Meetup'
        meetups[0].description == 'First Meetup desc'
        meetups[1].id == '2'
    }

    def "should return null if no events found"() {
        given:
        MeetupService meetupService = new MeetupService(meetupClient: Mock(MeetupClient))

        when:
        List<Meetup> meetups = meetupService.findMeetups(new FindMeetupRequest(city:'Dublin', countryCode: 'IE'))

        then:
        1 * meetupService.meetupClient.findOpenEventsByCityAndCountryCode('Dublin', 'IE') >> {
            new OpenEventsResult(results: [], meta: new Meta(totalCount: 0))
        }
        meetups == null
    }
}
