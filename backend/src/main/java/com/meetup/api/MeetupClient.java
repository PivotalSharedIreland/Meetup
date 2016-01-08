package com.meetup.api;

public interface MeetupClient {

    OpenEventsResult findOpenEventsByCityAndCountryCode(String city, String country);
    Event findEvent(final String urlName, final String id);

}
