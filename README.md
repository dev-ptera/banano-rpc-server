# nano-rpc-server
This is a middleware server which queries a local Nano/Banano node via configurable RPC actions.
It is intended that this app runs in parallel, on the same machine as a fully synched Nano node. 

This project supports two environments:

##### Local Development
Listens on port 3002 with no CORS restrictions.  Output Build folder is `dist/dev`.
> `yarn start`

##### Production Development
Listens on port 4002 with additional CORS restraints.  Output Build folder is `dist/production`. 
> `yarn start:production`

