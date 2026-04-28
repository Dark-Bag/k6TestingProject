import http from 'k6/http';
import { ENDPOINTS } from '../config/urls.js';
import { HEADERS } from '../config/const.js';

export function deleteTestimonialRequest(testimonialID, token) {
    const url = `${ENDPOINTS.TESTIMONIAL}/${testimonialID}`;
    const headers = token ? { ...HEADERS, Authorization: `Bearer ${token}` } : HEADERS.json;
    return http.del(url,null,{ headers });
}