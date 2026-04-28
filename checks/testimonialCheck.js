import { check } from "k6";


export function validateTestimonialResponse(response) {
    check(response, {
        'Testimonial created successfully': (r) => r.status === 201,

        "body is not empty": (r) => r.body.length > 0

    });
}

export function validateTestimonialUpdateResponse(response) {
    check(response, {
        'Testimonial updated successfully': (r) => r.status === 200,

        "body is not empty": (r) => r.body.length > 0

    });
}

export function validateTestimonialDeleteResponse(response) {
    check(response, {
        'Testimonial deleted successfully': (r) => r.status === 200,

        "body is not empty": (r) => r.body.length > 0

    });
}