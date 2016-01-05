package com.meetup.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Meta {

    public String next;

    @JsonProperty("total_count")
    public int totalCount;

    public String description;

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
