import http from 'k6/http';
import { URL } from '../config/urls.js';

export function authRequest(payload) {
    const url = URL.login;
    const body = JSON.stringify(payload);

    return  http.post(url, body) ;
}