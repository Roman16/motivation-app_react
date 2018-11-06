import axios from "axios/index";
import { loadProgressBar } from 'axios-progress-bar';

loadProgressBar();

const baseApiUrl = '';

const http = (method, url, data, type) => {
    let currentDate = new Date().getTimezoneOffset().toString();
    let token = localStorage.getItem('TOKEN');

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: baseApiUrl + url,
            data: data,
            headers: {
                'Content-Type': type || 'application/json',
                'timezoneOffset': currentDate,
                'authorization': `Bearer ${token}`
            }
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    })

};

export default http;