import { check } from "k6";

export function validateNewUserLoginResponse(response) {
    check(response, {
        'New User Login successful': (r) => r.status === 200,

        "body is not empty": (r) => r.body.length > 0

    });
}

export function validateNewUserRegistrationResponse(response) {
    check(response, {
        'New User Registration successful': (r) => r.status === 201,

        "body is not empty": (r) => r.body.length > 0

    });
}

export function validateNewUserApprovalResponse(response) {
    check(response, {
        'New User Approval successful': (r) => r.status === 200,

        "body is not empty": (r) => r.body.length > 0

    });
}

export function validateNewUserProfileResponse(response) {
    check(response, {
        'New User Profile loaded successful': (r) => r.status === 200,

        "body is not empty": (r) => r.body.length > 0

    });
}

export function validateNewUserDeleteResponse(response) {
    check(response, {
        'New User Deleted successful': (r) => r.status === 200,

        "body is not empty": (r) => r.body.length > 0

    });
}



