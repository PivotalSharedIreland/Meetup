package io.pivotal.meetup.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/meetups")
public class MeetupController {

    @Autowired
    private MeetupService meetupService;

    @RequestMapping(method = GET)
    public ResponseEntity<List<Meetup>> findMeetups(final FindMeetupRequest findMeetupRequest){
        List<Meetup> meetups = meetupService.findMeetups(findMeetupRequest);
        return meetups != null? ResponseEntity.ok(meetups) : new ResponseEntity<>(NOT_FOUND);
    }
}
