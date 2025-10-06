module.exports = ({ externalDataClient }) => {
    return {
        getFiles: async () => {
            try {
                const getExternalDataFilesResponse = await externalDataClient.getExternalDataFiles();

                return {
                    fetchedAt: new Date().toISOString(),
                    data: getExternalDataFilesResponse
                };

            } catch (error) {
                console.error('externalData.service.getFiles error:', error.message);
            }
        },
        getFileContent: async (fileName) => {
            try {
                const getExternalDataFileContentResponse = await externalDataClient.getExternalDataFileContent(fileName);

                const data = [];
                if (typeof getExternalDataFileContentResponse !== 'undefined') {
                    let rows = getExternalDataFileContentResponse.split(/\r?\n/);

                    if (rows.length > 0) {
                        for (let a = 1; a < rows.length; a++) {
                            let columns = rows[a].split(",");

                            if (columns[0] && columns[1] && columns[2] && columns[3]) {
                                data.push({ "text": columns[1], "number": columns[2], "hex": columns[3] });
                            }
                        }
                    }
                }

                return {
                    fetchedAt: new Date().toISOString(),
                    data: data
                };

            } catch (error) {
                console.error('externalData.service.getFileContent error:', error.message);
            }
        }
    };
};
