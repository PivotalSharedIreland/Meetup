package io.pivotal.meetup.events

import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import spock.lang.Specification

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class MeetupControllerSpec extends Specification {

    def 'Should return meetups' (){
        given:
        MeetupController meetupController = new MeetupController(meetupService: Mock(MeetupService))
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(meetupController).build()

        when:
        def response = mockMvc.perform(get('/meetups').param('city','Dublin').param('countryCode','IE'))

        then:
        1 * meetupController.meetupService.findMeetups(_ as FindMeetupRequest) >> { FindMeetupRequest findMeetupRequest ->
            assert findMeetupRequest.city == 'Dublin'
            assert findMeetupRequest.countryCode == 'IE'

            [new Meetup(id: "1"), new Meetup(id: "2")]
        }
        response.andExpect(status().isOk()).andExpect(jsonPath('$', hasSize(2)))
    }

    def 'Should return not found if there is no meetup' (){
        given:
        MeetupController meetupController = new MeetupController(meetupService: Mock(MeetupService))
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(meetupController).build()

        when:
        def response = mockMvc.perform(get('/meetups').param('city','Dublin').param('countryCode','IE'))

        then:
        1 * meetupController.meetupService.findMeetups(_ as FindMeetupRequest) >> { FindMeetupRequest findMeetupRequest ->
            assert findMeetupRequest.city == 'Dublin'
            assert findMeetupRequest.countryCode == 'IE'

            null
        }
        response.andExpect(status().isNotFound())
    }
}
