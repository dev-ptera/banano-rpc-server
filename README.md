# nano-rpc-proxy

This is a nodejs express app which proxies Nano (or Banano) RPC requests.
It is intended that this app runs on the same machine as a fully synced Nano node.

<img src="./stack.png" alt="Nano Client Stack" />

For instructions on how to setup a Nano node, visit https://docs.nano.org/running-a-node/node-setup/

## Configuration
`nano-rpc-server` can be configured to support custom node RPC ports, select RPC `actions`, etc. The supported config options can be found in `src/config.ts`
