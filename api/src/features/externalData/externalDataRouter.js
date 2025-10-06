const express = require('express');
const router = express.Router();
const config = require('../../config');
const { createHttpClient } = require('../../infra/httpClient');
const ExternalDataController = require('./externalData.controller');

const httpClient = createHttpClient();
const externalDataClient = require('./externalData.client')({
    httpClient,
    baseUrl: config.externalApiUrl,
    apiKey: config.apiKey
});

const externalDataService = require('./externalData.service')({ externalDataClient });
const externalDataController = ExternalDataController({ externalDataService });

router.get('/v1/files', externalDataController.getFiles);
router.get('/v1/files/data', externalDataController.getFilesData);

module.exports = router;
