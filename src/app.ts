require('dotenv').config();
import express from 'express';
import config from 'config';

const app = express();

const port = config.get('port');
const dbUri = config.get('dbUri');

app.listen(port, () => [
    console.log(`server running at http://localhost:${port}`),
    console.log(`connected database ${dbUri}`)
]);