# nano-rpc-proxy
This is a nodejs express app which proxies Nano (or Banano) RPC requests.
It is intended that this app runs on the same machine as a fully synced Nano node. 

> For instructions on how to setup a Nano node, visit https://docs.nano.org/running-a-node/node-setup/

## Environments

**Local Development** `[dev]`

Intended for local development. Output build folder is `dist/dev`.

**Production Development** `[prod]`

Intended for serving requests from external apps or whitelisted domains.  Output build folder is `dist/prod`. 

## Commands
`yarn start` > starts the development server at default port `1119`

`yarn start:production` > starts the production server at default port `1120`


## Configuration
`nano-rpc-server` can be configured to support custom node RPC ports, select RPC `actions`, etc. The supported config options can be found in `src/config.ts`
