const axios = require('axios');

const historicalApi = axios.create({
     baseURL: 'https://archive-api.open-meteo.com/v1'
});

module.exports = historicalApi;