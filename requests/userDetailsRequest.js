import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function userDetailsRequest(newUserID, token) {
    const url = `${ENDPOINTS.USERDETAILS}/${newUserID}`;
    const headers = token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS.json;
    return http.get(url, { headers });
}