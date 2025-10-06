module.exports = ({ httpClient, baseUrl, apiKey }) => {
    if (!httpClient) throw new Error('httpClient is required');

    return {
        getExternalDataFiles: async () => {
            try {
                const response = await httpClient.get(`${baseUrl}/v1/secret/files`, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`
                    }
                });
                return response.data;
            } catch (error) {
                console.error('externalData.client.getExternalDataFiles error:', error.message);
            }
        },
        getExternalDataFileContent: async (fileName) => {
            try {
                const response = await httpClient.get(`${baseUrl}/v1/secret/file/${fileName}`, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`
                    }
                });
                return response.data;
            } catch (error) {
                console.error('externalData.client.getExternalDataFileContent error:', fileName, error.message);
            }
        }
    };
};
