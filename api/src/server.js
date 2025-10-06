const createApp = require('./app');
const { port } = require('./config');

const app = createApp();

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
