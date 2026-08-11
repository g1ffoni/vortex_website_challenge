package com.unifortrade.api.auth.security;

public enum Permission {
    LISTING_CREATE("listing:create"),
    LISTING_UPDATE_OWN("listing:update:own"),
    LISTING_UPDATE_ANY("listing:update:any"),
    LISTING_DELETE_OWN("listing:delete:own"),
    LISTING_DELETE_ANY("listing:delete:any"),
    LISTING_CLAIM("listing:claim"),
    LISTING_COMPLETE("listing:complete"),
    LISTING_CONTACT("listing:contact"),
    CATEGORY_CREATE("category:create"),
    CATEGORY_DELETE("category:delete"),
    RATING_CREATE("rating:create"),
    USER_UPDATE_OWN("user:update:own"),
    USER_UPDATE_ANY("user:update:any"),
    USER_DELETE_OWN("user:delete:own"),
    USER_DELETE_ANY("user:delete:any");

    private final String value;

    Permission(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
