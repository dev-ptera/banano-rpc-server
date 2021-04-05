# demo-app

## Environments

**Local Development** 

Intended for local development. Output build folder is `dist/dev`

**Production Development** 

Intended for serving requests from external apps or whitelisted domains.  Output build folder is `dist/prod`

## Commands
`yarn start` > starts the development server at default port `1119`

`yarn start:production` > starts the production server at default port `1120`


## Configuration
`nano-rpc-server` can be configured to support custom node RPC ports, select RPC `actions`, etc. The supported config options can be found in `src/config.ts`
