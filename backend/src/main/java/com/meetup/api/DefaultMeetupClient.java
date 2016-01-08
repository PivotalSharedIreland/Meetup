package com.meetup.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

import static org.springframework.http.HttpStatus.OK;

@Profile("!mock")
@Component
public class DefaultMeetupClient implements MeetupClient{

    @Autowired
    private RestTemplate restTemplate;

    @Value("${meetup.api.key}")
    private String apiKey;

    public OpenEventsResult findOpenEventsByCityAndCountryCode(String city, String country) {
        return restTemplate.getForObject("https://api.meetup.com/2/open_events.json?key={key}&city={city}&country={country}", OpenEventsResult.class, new HashMap<String, String>() {{
            put("city", city);
            put("country", country);
            put("key", apiKey);
        }});
    }

    public Event findEvent(final String urlName, final String id) {
        ResponseEntity<Event> responseEntity = restTemplate.getForEntity("https://api.meetup.com/{urlName}/events/{id}?key={key}", Event.class, new HashMap<String, String>() {{
            put("id", id);
            put("urlName", urlName);
            put("key", apiKey);
        }});

        return responseEntity.getStatusCode() == OK ? responseEntity.getBody() : null;
    }


}
