import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function createRegistrationRequest(payload) {

    const url = ENDPOINTS.REGISTRATION;
    const body = JSON.stringify(payload);

    return http.post(url, body, { headers: HEADERS.json });

}