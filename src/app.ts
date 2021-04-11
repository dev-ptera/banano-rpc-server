import * as cors from 'cors';
import * as http from 'http';
import { NanoProxyServerConfig } from './config';
import axios, { AxiosResponse } from 'axios';
import { Express, Request, Response } from 'express';

const bodyParser = require('body-parser');

export class NanoProxyServer {
    app: Express;
    config: NanoProxyServerConfig;

    constructor(app: Express, config: NanoProxyServerConfig) {
        this.app = app;
        this.config = config;

        app.use(cors());
        app.options('*', cors());
        app.use(bodyParser.json());

        const send = (res, data, status = 200): void => res.status(status).send(JSON.stringify(data));
        const corsOptions = {
            origin: function (origin, callback) {
                if (config.IS_PRODUCTION && origin && config.URL_WHITE_LIST.indexOf(origin) === -1) {
                    callback(new Error(`Origin '${origin}' is not allowed by CORS`));
                } else {
                    callback(null, true);
                }
            },
        };

        const contactRpc = (body): Promise<any> =>
            axios
                .request<any>({
                    method: 'POST',
                    url: config.NANO_RPC_URL,
                    data: body,
                })
                .then((response: AxiosResponse<any>) => Promise.resolve(response.data))
                .catch((err) => Promise.reject(err));

        app.post(`/${config.APP_PATH}`, cors(corsOptions), async (req: Request, res: Response) => {
            const body = req.body;
            if (!body || !body.action || !config.ALLOWED_ACTIONS.includes(body.action)) {
                const error = `RPC action not enabled: ${req.body?.action}`;
                return send(res, { error }, 501);
            }
            await contactRpc(body)
                .then((data) => send(res, data))
                .catch((err) => send(res, err, 500));
        });
    }

    start(): void {
        const port = this.config.IS_PRODUCTION ? this.config.APP_PROD_PORT : this.config.APP_DEV_PORT;
        http.createServer(this.app).listen(port, () => {
            console.log(this.config.APP_LISTENING_MSG(port));
        });
    }
}
