import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import { RPC_URL, ALLOWED_ACTIONS, URL_WHITE_LIST, API_URL, PROD_PORT, DEV_PORT } from './config';
import axios, { AxiosResponse } from 'axios';
const bodyParser = require('body-parser');
import { Request, Response } from 'express';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());

const args = process.argv.slice(2);
const isProduction = (): boolean => args && args[0] === 'PRODUCTION';
const send = (res, data, status = 200): void => res.status(status).send(JSON.stringify(data));

const corsOptions = {
    origin: function (origin, callback) {
        if (origin && URL_WHITE_LIST.indexOf(origin) === -1) {
            callback(new Error('Not allowed by CORS'));
        } else {
            callback(null, true);
        }
    },
};

// Call local Banano node
const contactRpc = (body): Promise<any> =>
    axios
        .request<any>({
            method: 'post',
            url: RPC_URL,
            data: body,
        })
        .then((response: AxiosResponse<any>) => Promise.resolve(response.data))
        .catch((err) => Promise.reject(err));

app.post(`/${API_URL}`, cors(corsOptions), async (req: Request, res: Response) => {
    console.log(req);
    const body = req.body;
    if (!body || !body.action || !ALLOWED_ACTIONS.includes(body.action)) {
        const error = `RPC action not enabled: ${req.body?.action}`;
        return send(res, { error }, 501);
    }
    await contactRpc(body)
        .then((data) => send(res, data))
        .catch((err) => send(res, err, 500));
});

const port = isProduction() ? PROD_PORT : DEV_PORT;
http.createServer(app).listen(port, () => {
    console.log(`Running RPC server on port ${port}.`);
});
