import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function deleteNewUserRequest(newUserID, token) {
    const url = `${ENDPOINTS.DELETE}/${newUserID}`;
    const headers = token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS.json;
    return http.del(url, { headers });
}