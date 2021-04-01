import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';

const app = express();
app.use(cors());
app.options('*', cors());

export const RPC_URL = 'http://[::1]:7072';
const send = (res, data): void => res.send(JSON.stringify(data));

// Enabled RPCs

app.get('/test', (req, res) => send(res, { success: true }));

const port = 3002;
http.createServer(app).listen(port, () => {
    console.log(`Running RPC server on port ${port}.`);
});
