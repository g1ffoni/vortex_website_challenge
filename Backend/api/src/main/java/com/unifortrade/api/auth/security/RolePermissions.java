package com.unifortrade.api.auth.security;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

public final class RolePermissions {

    private static final Map<Role, Set<Permission>> BY_ROLE = new EnumMap<>(
        Role.class
    );

    static {
        BY_ROLE.put(
            Role.ROLE_USER,
            EnumSet.of(
                Permission.LISTING_CREATE,
                Permission.LISTING_UPDATE_OWN,
                Permission.LISTING_DELETE_OWN,
                Permission.LISTING_CLAIM,
                Permission.LISTING_COMPLETE,
                Permission.LISTING_CONTACT,
                Permission.RATING_CREATE,
                Permission.USER_UPDATE_OWN,
                Permission.USER_DELETE_OWN
            )
        );
        BY_ROLE.put(
            Role.ROLE_ADMIN,
            EnumSet.of(
                Permission.LISTING_CREATE,
                Permission.LISTING_UPDATE_OWN,
                Permission.LISTING_UPDATE_ANY,
                Permission.LISTING_DELETE_OWN,
                Permission.LISTING_DELETE_ANY,
                Permission.LISTING_CLAIM,
                Permission.LISTING_COMPLETE,
                Permission.LISTING_CONTACT,
                Permission.RATING_CREATE,
                Permission.USER_UPDATE_OWN,
                Permission.USER_UPDATE_ANY,
                Permission.USER_DELETE_OWN,
                Permission.USER_DELETE_ANY,
                Permission.CATEGORY_CREATE,
                Permission.CATEGORY_DELETE
            )
        );
    }

    private RolePermissions() {}

    public static Set<Permission> of(Role role) {
        return BY_ROLE.getOrDefault(role, Set.of());
    }
}
