package com.unifortrade.api.category.repository;

import com.unifortrade.api.category.entity.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findBySlug(String slug);

    List<Category> findAllByOrderByNameAsc();

    @Query(
        value = "SELECT COUNT(*) FROM categories WHERE slug = :slug",
        nativeQuery = true
    )
    long countBySlugIncludingDeleted(@Param("slug") String slug);
}

