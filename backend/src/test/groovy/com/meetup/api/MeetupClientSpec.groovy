package com.meetup.api

import org.springframework.web.client.RestTemplate
import spock.lang.Specification

class MeetupClientSpec extends Specification {

    def "Should find open events by city"() {

        given:
        RestTemplate restTemplate = Mock(RestTemplate)
        MeetupClient mc = new MeetupClient(restTemplate: restTemplate, apiKey: 'apiKey')

        when:
        def openEventResults = mc.findOpenEventsByCityAndCountryCode('Dublin', 'IE')

        then:
        1 * restTemplate.getForObject('https://api.meetup.com/2/open_events.json?key={key}&city={city}&country={country}', OpenEventsResult.class, _ as Map) >> { args ->
            Map queryParams = args[2]

            assert queryParams.size() == 3
            assert queryParams['city'] == 'Dublin'
            assert queryParams['country'] == 'IE'
            assert queryParams['key'] == 'apiKey'

            new OpenEventsResult(results: [new Event(id: "1"), new Event(id: "2")], meta: new Meta(totalCount: 2))
        }

        openEventResults.results.size() == 2
        openEventResults.results[0].id == '1'
        openEventResults.results[1].id == '2'
        openEventResults.meta.totalCount == 2
    }
}
