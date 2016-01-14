package com.meetup.api;

import com.google.common.collect.Lists;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Date;

@Profile("mock")
@Component
public class MockMeetupClient implements MeetupClient {

    @Override
    public OpenEventsResult findOpenEvents(String city, String country) {

        if("unknown".equals(city)){
            Meta meta = new Meta();
            meta.setTotalCount(0);
            OpenEventsResult openEventsResult = new OpenEventsResult();
            openEventsResult.setMeta(meta);
            return openEventsResult;
        }

        Meta meta = new Meta();
        meta.setTotalCount(2);
        meta.setDescription("mock data description");
        meta.setNext("next - not sure what is that");

        Event event = buildEvent();

        OpenEventsResult openEventsResult = new OpenEventsResult();
        openEventsResult.setMeta(meta);
        openEventsResult.setResults(Lists.newArrayList(event));

        return openEventsResult;
    }

    @Override
    public OpenEventsResult findOpenEvents(String city, String state, String country) {
        return findOpenEvents(city, country);
    }

    private Event buildEvent() {
        Group group = new Group();
        group.setUrlName("meaning-life");

        Event event = new Event();
        event.setId("1234");
        event.setName("Meaning of life");
        event.setTime(new Date(1452263331));
        event.setGroup(group);
        event.setDescription("Cool meetup about the meaning of life");
        return event;
    }

    @Override
    public Event findEvent(String urlName, String id) {
        return "unknown".equals(urlName) ? null : buildEvent();
    }
}
