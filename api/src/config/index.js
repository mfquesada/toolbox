require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    externalApiUrl: process.env.EXTERNAL_API_URL,
    apiKey: process.env.API_KEY
};
