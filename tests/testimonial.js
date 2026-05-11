import http from 'k6/http';
import { sleep } from "k6";
import { TEST_CONFIG } from "../config/const.js";
import { PAYLOAD } from "../data/payload.js";
import { authRequest } from "../requests/authRequest.js";
import { createTestimonialRequest } from "../requests/createTestimonialRequest.js";
import { updateTestimonialRequest } from "../requests/updateTestimonialRequest.js";
import { deleteTestimonialRequest } from "../requests/deleteTestimonialRequest.js";
import { validateLoginResponse } from "../checks/authChecks.js";
import { validateTestimonialResponse, validateTestimonialUpdateResponse,  validateTestimonialDeleteResponse } from "../checks/testimonialCheck.js";
import { getProfileRequest } from "../requests/getProfileRequest.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export  const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
}

export default function testimonialTest() {
    const loginResponse = authRequest(PAYLOAD.login);
    validateLoginResponse(loginResponse);

    const body = loginResponse.json();
    const token = body.data.token;

    const profileResponse = getProfileRequest(token);

    const createTestimonialResponse = createTestimonialRequest(PAYLOAD.testimonial, token);
    validateTestimonialResponse(createTestimonialResponse);

    const updateTestimonialResponse = updateTestimonialRequest(PAYLOAD.testimonial, createTestimonialResponse.json().data.id, token);
    validateTestimonialUpdateResponse(updateTestimonialResponse);

    const deleteTestimonialResponse = deleteTestimonialRequest(createTestimonialResponse.json().data.id, token);
    validateTestimonialDeleteResponse(deleteTestimonialResponse);

    sleep(TEST_CONFIG.sleeptime);

}

export function handleSummary(data) {
  return {
    "reports/report.html": htmlReport(data),
  }};