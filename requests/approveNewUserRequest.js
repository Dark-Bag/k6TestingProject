import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function approveNewUserRequest(payload, newUserID, token) {
    const url = `${ENDPOINTS.APPROVE}/${newUserID}/approve`;
    const body = JSON.stringify(payload);
    const headers = token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS.json;
    return http.put(url, body, { headers });
}