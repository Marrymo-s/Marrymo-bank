package site.marrymo.restapi.global.annotation;

import java.lang.annotation.*;

@Target({ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface LoginUser {
    boolean required() default true;
}
