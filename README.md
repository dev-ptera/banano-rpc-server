# banano-rpc-server
This is a middleware server which queries a local Banano node via enabled RPC actions.

This project supports two environments:

##### Local Development
This is intended for testing out local changes.
> `yarn start`

##### Production Development
This command should build & start a server that listens for incoming requests.  It is intended that this server runs on the same machine as a Banano node.  Similar to the banano node, this server should listen indefinitely.    
> `yarn start:production`

