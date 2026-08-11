package com.unifortrade.api.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class Profile {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String bio;

    @Column(length = 2048)
    private String profilePicture;
}

