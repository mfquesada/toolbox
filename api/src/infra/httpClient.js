const axios = require('axios');

function createHttpClient(defaultConfig = {}) {
    const client = axios.create({
        timeout: defaultConfig.timeout || 5000,
        ...defaultConfig
    });
    return client;
}

module.exports = { createHttpClient };
