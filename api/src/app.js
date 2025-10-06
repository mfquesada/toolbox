const express = require('express');
const externalDataRouter = require('./features/externalData/externalDataRouter');

const createApp = () => {
    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
    app.use(externalDataRouter);
    app.get('/health', (req, res) => res.json({ status: 'ok' }));

    return app;
};

module.exports = createApp;
