import http from 'k6/http';
import { sleep } from "k6";
import { TEST_CONFIG } from "../config/const.js";
import { PAYLOAD } from "../data/payload.js";
import { authRequest } from "../requests/authRequest.js";
import { validateLoginResponse } from "../checks/authChecks.js";
import { getProfileRequest } from "../requests/getProfileRequest.js";

export  const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
}

export default function getProfileTest() {
    const loginResponse = authRequest(PAYLOAD.login);
    validateLoginResponse(loginResponse);

    const body = loginResponse.json();
    const token = body.data.token;

    const profileResponse = getProfileRequest(token);
    
    
} 