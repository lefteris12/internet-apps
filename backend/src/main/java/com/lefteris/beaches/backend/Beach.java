package com.lefteris.beaches.backend;

public class Beach {
    private final String bwid, name, nameGr, description;
    private final double lon, lat, distance;
    private final int category;

    public Beach (String bwid, String name, String nameGr, String description, double lon, double lat, int category, double distance) {
        this.bwid = bwid;
        this.name = name;
        this.nameGr = nameGr;
        this.description = description;
        this.lon = lon;
        this.lat = lat;
        this.category = category;
        this.distance = distance;
    }

    public String getBwid() {
        return bwid;
    }

    public String getName() {
        return name;
    }

    public String getNameGr() {
        return nameGr;
    }

    public String getDescription() {
        return description;
    }

    public double getLon() {
        return lon;
    }

    public double getLat() {
        return lat;
    }

    public double getDistance() {
        return distance;
    }

    public int getCategory() {
        return category;
    }
}
