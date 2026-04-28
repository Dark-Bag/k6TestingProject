import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function updateTestimonialRequest(payload, testimonialID, token) {
    const url = `${ENDPOINTS.TESTIMONIAL}/${testimonialID}`;
    const body = JSON.stringify(payload);
    const headers = token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS.json;
    return http.put(url, body, { headers });
}