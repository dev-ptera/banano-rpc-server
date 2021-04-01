import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import { PORT, RPC_URL, ALLOWED_ACTIONS, URL_WHITE_LIST, API_URL } from './config';
import axios, { AxiosResponse } from 'axios';
const bodyParser = require('body-parser');
import { Request, Response } from 'express';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());

const corsOptions = {
    origin: function (origin, callback) {
        if (origin && URL_WHITE_LIST.indexOf(origin) === -1) {
            // TODO: If Production, deny no origin.
            callback(new Error('Not allowed by CORS'));
        } else {
            callback(null, true);
        }
    },
};

// JSON-ify the response
const send = (res, data): void => res.send(JSON.stringify(data));

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
    const body = req.body;
    if (!body || !body.action || !ALLOWED_ACTIONS.includes(body.action)) {
        return send(res, { error: 'invalid or disabled action' });
    }
    await contactRpc(body)
        .then((data) => send(res, data))
        .catch((err) => send(res, err));
});

http.createServer(app).listen(PORT, () => {
    console.log(`Running RPC server on port ${PORT}.`);
});
