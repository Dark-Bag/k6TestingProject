import http from 'k6/http';
import { URL } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function getProfileRequest(token) {
    const headers =  token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS.json;

    return http.get(URL.profile, { headers });
    };