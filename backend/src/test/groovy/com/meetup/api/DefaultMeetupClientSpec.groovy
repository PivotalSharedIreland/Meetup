package com.meetup.api

import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestTemplate
import spock.lang.Specification

import static org.springframework.http.HttpStatus.NOT_FOUND

class DefaultMeetupClientSpec extends Specification {

    DefaultMeetupClient mc;

    void setup() {
        mc = new DefaultMeetupClient(restTemplate: Mock(RestTemplate), apiKey: 'apiKey')
    }

    def "Should find open events by city and state"() {
        when:
        def openEventResults = mc.findOpenEvents('San Francisco', 'CA', 'USA')

        then:
        1 * mc.restTemplate.getForObject('https://api.meetup.com/2/open_events.json?key={key}&city={city}&state={state}&country={country}', OpenEventsResult.class, _ as Map) >> { args ->
            Map queryParams = args[2]

            assert queryParams.size() == 4
            assert queryParams['city'] == 'San Francisco'
            assert queryParams['state'] == 'CA'
            assert queryParams['country'] == 'USA'
            assert queryParams['key'] == 'apiKey'


            new OpenEventsResult(results: [
                    new Event(id: "1", group: new Group(urlName: 'url1')),
                    new Event(id: "2", group: new Group(urlName: 'url2'))
            ],

                    meta: new Meta(totalCount: 2))
        }

        openEventResults.results.size() == 2
        openEventResults.results[0].id == '1'
        openEventResults.results[1].id == '2'
        openEventResults.meta.totalCount == 2
        openEventResults.results[0].group.urlName == 'url1'
        openEventResults.results[1].group.urlName == 'url2'

    }

    def "Should find open events by city"() {

        when:
        def openEventResults = mc.findOpenEvents('Dublin', 'IE')

        then:
        1 * mc.restTemplate.getForObject('https://api.meetup.com/2/open_events.json?key={key}&city={city}&country={country}', OpenEventsResult.class, _ as Map) >> { args ->
            Map queryParams = args[2]

            assert queryParams.size() == 3
            assert queryParams['city'] == 'Dublin'
            assert queryParams['country'] == 'IE'
            assert queryParams['key'] == 'apiKey'


            new OpenEventsResult(results: [
                    new Event(id: "1", group: new Group(urlName: 'url1')),
                    new Event(id: "2", group: new Group(urlName: 'url2'))
            ],

                    meta: new Meta(totalCount: 2))
        }

        openEventResults.results.size() == 2
        openEventResults.results[0].id == '1'
        openEventResults.results[1].id == '2'
        openEventResults.meta.totalCount == 2
        openEventResults.results[0].group.urlName == 'url1'
        openEventResults.results[1].group.urlName == 'url2'
    }

    def "Should find specific event by id and urlName"() {

        given:
        def eventId = '227782967'
        def urlName = 'The-Dublin-French-Meetup-Group'
        def apiKey = 'apiKey'
        def event = new Event(id: eventId, group: new Group(urlName: urlName))

        when:
        def specificEvent = mc.findEvent(urlName, eventId);

        then:
        1 * mc.restTemplate.getForEntity('https://api.meetup.com/{urlName}/events/{id}?key={key}', Event.class, _ as Map) >> { args ->

            Map queryParams = args[2]

            assert queryParams.size() == 3

            assert queryParams['id'] == eventId
            assert queryParams['urlName'] == urlName
            assert queryParams['key'] == apiKey

            ResponseEntity.ok(event)
        }

        specificEvent == event

    }

    def "Should handle 404 gracefully"() {

        given:
        def eventId = 'notfound'
        def urlName = 'blah'
        def apiKey = 'apiKey'

        when:
        def specificEvent = mc.findEvent(urlName, eventId)

        then:
        1 * mc.restTemplate.getForEntity('https://api.meetup.com/{urlName}/events/{id}?key={key}', Event.class, _ as Map) >> { args ->
            new ResponseEntity<Event>(NOT_FOUND)
        }

        specificEvent == null
    }

}
