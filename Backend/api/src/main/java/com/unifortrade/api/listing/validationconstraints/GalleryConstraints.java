package com.unifortrade.api.listing.validationconstraints;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.RECORD_COMPONENT;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.unifortrade.api.common.util.ValidationSupport;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.util.List;

@Target({ RECORD_COMPONENT, FIELD, PARAMETER, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = GalleryConstraints.Validator.class)
@Documented
public @interface GalleryConstraints {
    String message() default "Gallery is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default false;

    int maxImages() default 10;

    class Validator
        implements ConstraintValidator<GalleryConstraints, List<String>>
    {

        private boolean required;
        private int maxImages;

        @Override
        public void initialize(GalleryConstraints annotation) {
            this.required = annotation.required();
            this.maxImages = annotation.maxImages();
        }

        @Override
        public boolean isValid(
            List<String> value,
            ConstraintValidatorContext context
        ) {
            if (value == null || value.isEmpty()) {
                return required
                    ? ValidationSupport.fail(
                          context,
                          "At least one image is required"
                      )
                    : true;
            }
            if (value.size() > maxImages) {
                return ValidationSupport.fail(
                    context,
                    "No more than " + maxImages + " images are allowed"
                );
            }
            return true;
        }
    }
}

