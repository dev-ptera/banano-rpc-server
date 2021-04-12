# @dev-ptera/nano-rpc-proxy

This is a nodejs express app which proxies incoming Nano RPC API requests and queries a configured Nano node.  It is intended that this app runs on the same machine as a fully synced Nano node.

For instructions on how to setup a Nano node, visit https://docs.nano.org/running-a-node/node-setup/

## Usage

To install the package:

`yarn add @dev-ptera/nano-rpc-proxy`

or

`npm i @dev-ptera/nano-rpc-proxy`

###
Add the following to your typescript application:
```ts
import * as express from 'express';
import { NanoProxyServer } from '@dev-ptera/nano-rpc-proxy';


const server = new NanoProxyServer(express(), {
    
    /* Server message emitted when app starts listening on `port`. */
    APP_LISTENING_MSG: (port: number) => `Running @dev-ptera/nano-rpc-proxy server on port ${port}.`,

    /* Server is expected to serve external requests. */
    IS_PRODUCTION: false,

    /* Nano/Banano Node RPC URL */
    NANO_RPC_URL: 'http://[::1]:7072',

    /* Server port when ran locally for development purposes. */
    APP_DEV_PORT: 1119,

    /* Server port when listening to outside requests. */
    APP_PROD_PORT: 1120,

    /* URL path where the app is served.  Example: http://[YOUR-IP]:[APP_DEV_PORT | APP_PROD_PORT]/[APP_PATH] */
    APP_PATH: '',

    /* 
       List of enabled websites that can bypass server CORS restriction.
       CORS is not enforced when server is ran in development-mode.
    */
    URL_WHITE_LIST: ['http://localhost'],

    /*
       List of actions we can use with Nano RPC Protocol,
       Full list of actions & descriptions here: https://docs.nano.org/commands/rpc-protocol
     */
    ALLOWED_ACTIONS: ['account_balance']
});

server.start();
```


## Configuration
This server can be configured to support:

- Whitelisted external domains.
- Select RPC actions
- Nano or Banano Nodes
- Custom Server Ports & Server Path
- etc.

All supported config options can be found in `src/config.ts`

## Error Handling

This sever returns an error code 501 when a disabled action was requested by a client.  
This server returns an error code 500 for everything else.