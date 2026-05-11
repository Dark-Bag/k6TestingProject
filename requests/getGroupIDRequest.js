import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function getGroupIDRequest() {
    return http.get(ENDPOINTS.GROUPS, { headers: HEADERS.json });
};