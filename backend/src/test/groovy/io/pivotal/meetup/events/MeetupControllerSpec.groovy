package io.pivotal.meetup.events

import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import spock.lang.Specification

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class MeetupControllerSpec extends Specification {

    MeetupController meetupController
    MockMvc mockMvc

    void setup() {
        meetupController = new MeetupController(meetupService: Mock(MeetupService))
        mockMvc = MockMvcBuilders.standaloneSetup(meetupController).build()
    }

    def 'Should return meetups'() {
        when:
        def response = mockMvc.perform(get('/meetups').param('city', 'Dublin').param('countryCode', 'IE'))

        then:
        1 * meetupController.meetupService.findMeetups(_ as FindMeetupsRequest) >> { FindMeetupsRequest findMeetupRequest ->
            assert findMeetupRequest.city == 'Dublin'
            assert findMeetupRequest.countryCode == 'IE'

            [new Meetup(id: "1"), new Meetup(id: "2")]
        }
        response.andExpect(status().isOk()).andExpect(jsonPath('$', hasSize(2)))
    }

    def 'Should return not found if there is no meetup'() {
        when:
        def response = mockMvc.perform(get('/meetups').param('city', 'Dublin').param('countryCode', 'IE'))

        then:
        1 * meetupController.meetupService.findMeetups(_ as FindMeetupsRequest) >> { FindMeetupsRequest findMeetupRequest ->
            assert findMeetupRequest.city == 'Dublin'
            assert findMeetupRequest.countryCode == 'IE'

            null
        }
        response.andExpect(status().isNotFound())
    }

    def 'Should return an event'() {

        given:
        def eventId = '227782967'
        def urlName = 'The-Dublin-French-Meetup-Group'

        when:
        def response = mockMvc.perform(get("/meetups/${urlName}/events/${eventId}"))

        then:
        1 * meetupController.meetupService.findMeetup(urlName, eventId) >> new Meetup(id: "1")


        response.andExpect(status().isOk())

    }

    def 'Should not find a Meetup'() {

        given:
        def eventId = 'fakeId'
        def urlName = 'dontExist'

        when:
        def response = mockMvc.perform(get("/meetups/${urlName}/events/${eventId}"))

        then:
        1 * meetupController.meetupService.findMeetup(urlName, eventId) >> null

        response.andExpect(status().isNotFound())

    }

}
