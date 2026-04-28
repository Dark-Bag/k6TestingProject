import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function createTestimonialRequest(payload, token) {
    const url = ENDPOINTS.TESTIMONIAL;
    const body = JSON.stringify(payload);
    const headers =  token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS.json;    
    return http.post(url, body, { headers });

}