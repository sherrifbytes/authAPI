require('dotenv').config();
import express from 'express';
import config from 'config';
import connectToDb from './utils/connectToDb';
import log from './utils/logger';

const app = express();

const port = config.get('port');
const dbUri = config.get('dbUri');

app.listen(port, () => {
    log.info('server running at http://localhost:${port}');
    connectToDb();
});