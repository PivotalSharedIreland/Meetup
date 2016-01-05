package com.meetup.api;

import java.util.List;

public class OpenEventsResult {

    private List<Event> results;
    private Meta meta;

    public List<Event> getResults() {
        return results;
    }

    public void setResults(List<Event> results) {
        this.results = results;
    }

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }
}
