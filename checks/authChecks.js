import { check } from "k6";

export function validateLoginResponse(response) {
    check(response, {
        'Login successful': (r) => r.status === 200,

        "body is not empty": (r) => r.body.length > 0

    });
}

