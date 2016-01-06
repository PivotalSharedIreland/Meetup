package com.meetup.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Group {

    @JsonProperty("urlname")
    private String urlName;

    public String getUrlName() {
        return urlName;
    }

    public void setUrlName(String urlName) {
        this.urlName = urlName;
    }
}
