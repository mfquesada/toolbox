module.exports = ({ externalDataService }) => {
    return {
        getFiles: async (req, res) => {
            try {
                const getFilesResponse = await externalDataService.getFiles();
                res.json(getFilesResponse);
            } catch (err) {
                console.error('externalData.controller.getFiles error:', err.message);
                res.status(500).json({ error: 'Error fetching external data' });
            }
        },
        getFilesData: async (req, res) => {
            try {
                const getFilesResponse = await externalDataService.getFiles();
                const files = [];
                for (let a = 0; a < getFilesResponse.data.files.length; a++) {
                    let fileName = getFilesResponse.data.files[a];
                    const getFileContentResponse = await externalDataService.getFileContent(fileName);
                    if (getFileContentResponse.data.length > 0) {
                        files.push({ "file": fileName, "lines": getFileContentResponse.data });
                    }
                }
                res.json(files);
            } catch (err) {
                console.error('externalData.controller.getFilesData error:', err.message);
                res.status(500).json({ error: 'Error fetching external data' });
            }
        }
    };
};
