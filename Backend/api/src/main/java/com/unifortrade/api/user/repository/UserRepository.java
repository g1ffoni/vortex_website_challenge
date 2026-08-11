package com.unifortrade.api.user.repository;

import com.unifortrade.api.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUniforId(String uniforId);

    boolean existsByUniforId(String uniforId);

    boolean existsByContactInfoEmail(String email);

    boolean existsByContactInfoPhoneNumber(String phoneNumber);

    boolean existsByContactInfoEmailAndIdNot(String email, Long id);

    boolean existsByContactInfoPhoneNumberAndIdNot(String phoneNumber, Long id);
}

