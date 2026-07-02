const axios = require('axios');

const api = axios.create({
    baseURL: "https://api.open-meteo.com/v1"
});

module.exports = api;