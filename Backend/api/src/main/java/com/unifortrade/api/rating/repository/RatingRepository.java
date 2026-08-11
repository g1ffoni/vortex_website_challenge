package com.unifortrade.api.rating.repository;

import com.unifortrade.api.rating.entity.Rating;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    List<Rating> findByRatedId(Long ratedId);

    boolean existsByRaterIdAndRatedId(Long raterId, Long ratedId);

    @Query("SELECT AVG(r.score) FROM Rating r WHERE r.rated.id = :ratedId")
    Double findAverageScoreByRatedId(@Param("ratedId") Long ratedId);
}

