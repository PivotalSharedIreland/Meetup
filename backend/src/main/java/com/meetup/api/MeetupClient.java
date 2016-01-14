package com.meetup.api;

public interface MeetupClient {

    OpenEventsResult findOpenEvents(String city, String country);
    OpenEventsResult findOpenEvents(String city, String state, String country);
    Event findEvent(final String urlName, final String id);

}
