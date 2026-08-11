package com.unifortrade.api.common.validation.constraints;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.RECORD_COMPONENT;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.unifortrade.api.common.util.ValidationSupport;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.net.URI;
import java.net.URISyntaxException;

@Target({ RECORD_COMPONENT, FIELD, PARAMETER, ANNOTATION_TYPE, TYPE_USE })
@Retention(RUNTIME)
@Constraint(validatedBy = UrlConstraints.Validator.class)
@Documented
public @interface UrlConstraints {
    String message() default "URL is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default false;

    class Validator implements ConstraintValidator<UrlConstraints, String> {

        private boolean required;

        @Override
        public void initialize(UrlConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(
            String value,
            ConstraintValidatorContext context
        ) {
            if (value == null || value.isBlank()) {
                return required
                    ? ValidationSupport.fail(context, "URL is required")
                    : true;
            }
            if (value.length() > 2048) {
                return ValidationSupport.fail(
                    context,
                    "URL must not exceed 2048 characters"
                );
            }
            if (!isValidUrl(value)) {
                return ValidationSupport.fail(
                    context,
                    "URL must be a valid http(s) URL"
                );
            }
            return true;
        }

        private boolean isValidUrl(String url) {
            try {
                URI uri = new URI(url);
                return (
                    uri.isAbsolute() &&
                    ("http".equalsIgnoreCase(uri.getScheme()) ||
                        "https".equalsIgnoreCase(uri.getScheme()))
                );
            } catch (URISyntaxException e) {
                return false;
            }
        }
    }
}

