import http from 'k6/http';
import { TEST_CONFIG } from "../config/const.js";
import { newUserLoginPayload, PAYLOAD } from "../data/payload.js";
import { createRegistrationRequest } from "../requests/registrationRequest.js";
import { generateRandomEmail } from '../utils/dataGenerator.js';
import { registrationPayload } from '../data/payload.js';
import { authRequest } from "../requests/authRequest.js";
import { validateLoginResponse } from "../checks/authChecks.js";
import { validateNewUserLoginResponse, validateNewUserApprovalResponse, validateNewUserRegistrationResponse,
     validateNewUserProfileResponse, validateNewUserDeleteResponse } from "../checks/newUser.js";
import { sleep } from "k6";
import { getGroupIDRequest } from '../requests/getGroupIDRequest.js';
import { approveNewUserRequest } from '../requests/approveNewUserRequest.js';
import { newUserLoginRequest } from '../requests/newUserLogin.js';
import { userDetailsRequest } from '../requests/userDetailsRequest.js';
import { getProfileRequest } from '../requests/getProfileRequest.js';
import { createTestimonialRequest } from "../requests/createTestimonialRequest.js";
import { updateTestimonialRequest } from "../requests/updateTestimonialRequest.js";
import { deleteTestimonialRequest } from "../requests/deleteTestimonialRequest.js";
import { validateTestimonialResponse, validateTestimonialUpdateResponse,  
    validateTestimonialDeleteResponse } from "../checks/testimonialCheck.js";
import { deleteNewUserRequest } from '../requests/deleteNewUserRequest.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export  const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
}
export default function e2eTestingWorkflow() {

    const groupIDResponse = getGroupIDRequest();
    const groupBody = groupIDResponse.json();
    const groupID = groupBody.data.id;

    const email = generateRandomEmail();
    const payload = registrationPayload(email);

    const registrationResponse = createRegistrationRequest(payload);
        validateNewUserRegistrationResponse(registrationResponse);

    const registrationBody = registrationResponse.json();
    const newUserID = registrationBody.data.id;

    const loginResponse = authRequest(PAYLOAD.login);
        validateLoginResponse(loginResponse);
    
    const adminTokenbody = loginResponse.json();
    const adminToken = adminTokenbody.data.token;

    const approvalResponse = approveNewUserRequest(PAYLOAD.approvalStatus, newUserID, adminToken);
        validateNewUserApprovalResponse(approvalResponse);
    const userDetailsResponse = userDetailsRequest(newUserID, adminToken);

    const userDetailsBody = userDetailsResponse.json();
    const newUserEmail = userDetailsBody.data.Email;

    const newUserPayload = newUserLoginPayload(newUserEmail);
    const newUserLoginResponse = newUserLoginRequest(newUserPayload);
    validateNewUserLoginResponse(newUserLoginResponse);

    const newUserTokenbody = newUserLoginResponse.json();
    const newUserToken = newUserTokenbody.data.token;
 
    const profileResponse = getProfileRequest(newUserToken);
    validateNewUserProfileResponse(profileResponse);
    const createTestimonialResponse = createTestimonialRequest(PAYLOAD.testimonial, newUserToken);
    validateTestimonialResponse(createTestimonialResponse);
   
    const updateTestimonialResponse = updateTestimonialRequest(PAYLOAD.testimonial, createTestimonialResponse.json().data.id, newUserToken);
    validateTestimonialUpdateResponse(updateTestimonialResponse);
   
    const deleteTestimonialResponse = deleteTestimonialRequest(createTestimonialResponse.json().data.id, newUserToken);
    validateTestimonialDeleteResponse(deleteTestimonialResponse);

    sleep(TEST_CONFIG.sleeptime);

}

export function handleSummary(data) {
  return {
    "reports/report.html": htmlReport(data),
  }};
