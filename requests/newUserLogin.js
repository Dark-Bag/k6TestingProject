import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';

export function newUserLoginRequest(payload) {
    const url = ENDPOINTS.LOGIN;
    const body = JSON.stringify(payload);

    return  http.post(url, body) ;
}