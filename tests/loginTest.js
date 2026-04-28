import http from 'k6/http';
import { TEST_CONFIG } from "../config/const.js";
import { PAYLOAD } from "../data/payload.js";
import { authRequest } from "../requests/authRequest.js";
import { validateLoginResponse } from "../checks/authChecks.js";
import { sleep } from "k6";

export  const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
}
export default function loginTest() {
    const response = authRequest(PAYLOAD.login);

    validateLoginResponse(response);
    sleep(TEST_CONFIG.sleeptime);

}
