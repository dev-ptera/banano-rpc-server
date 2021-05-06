import * as cors from 'cors';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import { NanoProxyServerConfig } from './config';
import axios, { AxiosResponse } from 'axios';
import { Express, Request, Response } from 'express';

export class NanoProxyServer {
    app: Express;
    config: NanoProxyServerConfig;

    constructor(app: Express, config: NanoProxyServerConfig) {
        this.app = app;
        this.config = config;
        const corsOptions = {
            origin: function (origin, callback) {
                if (config.IS_PRODUCTION && origin && config.URL_WHITE_LIST.indexOf(origin) === -1) {
                    callback(new Error(`Origin '${origin}' is not allowed by CORS`));
                } else {
                    callback(null, true);
                }
            },
        };

        const send = (res, data, status: number): void => res.status(status).send(JSON.stringify(data));
        const contactRpc = (body): Promise<any> =>
            axios
                .request<any>({
                    method: 'POST',
                    url: config.NANO_RPC_URL,
                    data: body,
                })
                .then((response: AxiosResponse) => Promise.resolve(response.data))
                .catch((err) => Promise.reject(err));

        app.use(bodyParser.json());
        app.use(cors(corsOptions));
        if (config.REQUEST_FILTER) {
            app.use(config.REQUEST_FILTER);
        }
        app.post(`/${config.APP_PATH}`, async (req: Request, res: Response) => {
            const body = req.body;
            if (!body || !body.action || !config.ALLOWED_ACTIONS.includes(body.action)) {
                const error = `RPC action not enabled: ${req.body?.action}`;
                return send(res, { error }, 501);
            }
            await contactRpc(body)
                .then((data) => send(res, data, 200))
                .catch((err: Error) => send(res, err, 500));
        });
    }

    start(): void {
        const port = this.config.IS_PRODUCTION ? this.config.APP_PROD_PORT : this.config.APP_DEV_PORT;
        http.createServer(this.app).listen(port, () => {
            console.log(this.config.APP_LISTENING_MSG(port));
        });
    }
}
