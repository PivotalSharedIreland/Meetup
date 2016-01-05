package com.meetup.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@Component
public class MeetupClient {

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

}
