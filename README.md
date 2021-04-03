# nano-rpc-server
This is a nodejs express app which proxies Nano (or Banano) RPC requests.
It is intended that this app runs on the same machine as a fully synced Nano node. 

## Environments

#### Local Development `dev`
Intended for local development. Output build folder is `dist/dev`.

#### Production Development `prod`
Intended for serving requests from APIs or whitelisted domains.  Output build folder is `dist/prod`. 

## Commands
`yarn start` > starts the development server at default port `3002`

`yarn start:production` > starts the production server at default port `4002`


## Configuration
`nano-rpc-server` can be configured to support custom node RPC ports, select RPC `actions`, etc. The supported config options can be found in `src/config.ts`
