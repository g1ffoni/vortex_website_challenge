package com.unifortrade.api.user.validationconstraints;

import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.*;

import com.unifortrade.api.common.util.ValidationSupport;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({RECORD_COMPONENT, FIELD, PARAMETER, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = BioConstraints.Validator.class)
@Documented
public @interface BioConstraints {

    String message() default "Bio is invalid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    boolean required() default false;

    class Validator implements ConstraintValidator<BioConstraints, String> {
        private boolean required;

        @Override
        public void initialize(BioConstraints annotation) {
            this.required = annotation.required();
        }

        @Override
        public boolean isValid(String value, ConstraintValidatorContext context) {
            if (value == null || value.isBlank()) {
                return required ? ValidationSupport.fail(context, "Bio is required") : true;
            }

            if (value.length() > 500) {
                return ValidationSupport.fail(context, "Bio must not exceed 500 characters");
            }

            return true;
        }
    }
}

