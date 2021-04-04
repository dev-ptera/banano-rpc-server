import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import { NANO_RPC_URL, ALLOWED_ACTIONS, URL_WHITE_LIST, APP_DEV_PORT, APP_PATH, APP_PROD_PORT } from './config';
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
        if (isProduction() && origin && URL_WHITE_LIST.indexOf(origin) === -1) {
            callback(new Error(`Origin '${origin}' is not allowed by CORS`));
        } else {
            callback(null, true);
        }
    },
};

// Call local Banano node
const contactRpc = (body): Promise<any> =>
    axios
        .request<any>({
            method: 'POST',
            url: NANO_RPC_URL,
            data: body,
        })
        .then((response: AxiosResponse<any>) => Promise.resolve(response.data))
        .catch((err) => Promise.reject(err));

app.post(`/${APP_PATH}`, cors(corsOptions), async (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.action || !ALLOWED_ACTIONS.includes(body.action)) {
        const error = `RPC action not enabled: ${req.body?.action}`;
        return send(res, { error }, 501);
    }
    await contactRpc(body)
        .then((data) => send(res, data))
        .catch((err) => send(res, err, 500));
});

const port = isProduction() ? APP_PROD_PORT : APP_DEV_PORT;
http.createServer(app).listen(port, () => {
    console.log(`Running RPC server on port ${port}.`);
});
