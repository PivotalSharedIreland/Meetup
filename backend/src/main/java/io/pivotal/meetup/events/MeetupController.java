package io.pivotal.meetup.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class MeetupController {

    @Autowired
    private MeetupService meetupService;

    @RequestMapping(value = "/meetups", method = GET)
    public ResponseEntity<List<Meetup>> findMeetups(final FindMeetupsRequest findMeetupsRequest) {
        List<Meetup> meetups = meetupService.findMeetups(findMeetupsRequest);
        return meetups != null ? ResponseEntity.ok(meetups) : new ResponseEntity<>(NOT_FOUND);
    }

    @RequestMapping(value = "/meetups/{urlName}/events/{eventId}", method = GET)
    public ResponseEntity<Meetup> findMeetup(@PathVariable final String urlName, @PathVariable final String eventId) {
        Meetup meetup = meetupService.findMeetup(urlName, eventId);
        return meetup != null ? ResponseEntity.ok(meetup) : new ResponseEntity<>(NOT_FOUND);
    }


}
