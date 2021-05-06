import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { NanoProxyServer } from '@dev-ptera/nano-rpc-proxy';
import { authKeys } from './auth-keys';

const args = process.argv.slice(2);
const path = 'banano-rpc';
const isProduction = args && args[0] === 'production';
const server = new NanoProxyServer(express(), {
    /* Server message emitted when app starts listening on `port`. */
    APP_LISTENING_MSG: (port: number): string =>
        `Running @dev-ptera/nano-rpc-proxy server on port ${port} at path /${path}.`,

    /* Server is expected to serve external requests. */
    IS_PRODUCTION: isProduction,

    /* Nano/Banano Node RPC URL */
    NANO_RPC_URL: 'http://[::1]:7072',

    /* Server port when ran locally for development purposes. */
    APP_DEV_PORT: 1119,

    /* Server port when listening to outside requests. */
    APP_PROD_PORT: 1120,

    /* URL path where the app is served.  Example: http://[YOUR-IP]:[APP_DEV_PORT | APP_PROD_PORT]/[APP_PATH] */
    APP_PATH: path,

    /*
       List of enabled websites that can bypass server CORS restriction.
       CORS is not enforced when server is ran in development-mode.
    */
    URL_WHITE_LIST: ['http://localhost'],

    /**
     * Optional function ran to security-check incoming requests.
     * Runs after the CORS filter.
     * @returns false if the request should be terminated.
     */
    REQUEST_FILTER: (req: Request, res: Response, next: NextFunction): void => {
        const origin = req.get('origin');
        if (isProduction && !origin) {
            // Authorization Required
            const auth = req.get('authorization');
            if (!authKeys.has(auth)) {
                res.status(401).send(
                    JSON.stringify({
                        error: 'unauthorized',
                    })
                );
                return;
            }
        }
        next();
    },

    /*
       List of actions we can use with Nano RPC Protocol,
       Full list of actions & descriptions here: https://docs.nano.org/commands/rpc-protocol
     */
    ALLOWED_ACTIONS: [
        'account_balance',
        // 'account_block_count',
        // 'account_count',
        // 'account_create',
        // 'account_get',
        'account_history',
        'account_info',
        // 'account_key',
        // 'account_list',
        // 'account_move',
        // 'account_remove',
        'account_representative',
        // 'account_representative_set',
        // 'account_weight',
        // 'accounts_balances',
        // 'accounts_create',
        // 'accounts_frontiers',
        // 'accounts_pending',
        'available_supply',
        // 'block',
        // 'block_confirm',
        // 'blocks',
        // 'blocks_info',
        // 'block_account',
        'block_count',
        // 'block_count_type',
        // 'block_create',
        // 'block_hash',
        // 'successors',
        // 'bootstrap',
        // 'bootstrap_any',
        // 'chain',
        // 'confirmation_history',
        'confirmation_quorum',
        // 'delegators',
        // 'delegators_count',
        // 'deterministic_key',
        // 'frontiers',
        // 'frontier_count',
        // 'history',
        // 'keepalive',
        // 'key_create',
        // 'key_expand',
        // 'krai_from_raw',
        // 'krai_to_raw',
        // 'ledger',
        'mrai_from_raw',
        'mrai_to_raw',
        // 'password_change',
        // 'password_enter',
        // 'password_valid',
        // 'payment_begin',
        // 'payment_init',
        // 'payment_end',
        // 'payment_wait',
        'peers',
        // 'pending',
        // 'pending_exists',
        // 'process',
        // 'rai_from_raw',
        // 'rai_to_raw',
        // 'receive',
        // 'receive_minimum',
        // 'receive_minimum_set',
        'representatives',
        'representatives_online',
        // 'republish',
        // 'search_pending',
        // 'search_pending_all',
        // 'send',
        // 'stats',
        // 'stop',
        // 'unchecked',
        // 'unchecked_clear',
        // 'unchecked_get',
        // 'unchecked_keys',
        // 'validate_account_number',
        // 'version',
        // 'wallet_add',
        // 'wallet_add_watch',
        // 'wallet_balance_total',
        // 'wallet_balances',
        // 'wallet_change_seed',
        // 'wallet_contains',
        // 'wallet_create',
        // 'wallet_destroy',
        // 'wallet_export',
        // 'wallet_frontiers',
        // 'wallet_info',
        // 'wallet_key_valid',
        // 'wallet_ledger',
        // 'wallet_lock',
        // 'wallet_locked',
        // 'wallet_pending',
        // 'wallet_representative',
        // 'wallet_representative_set',
        // 'wallet_republish',
        // 'wallet_work_get',
        // 'work_generate',
        // 'work_cancel',
        // 'work_get',
        // 'work_set',
        // 'work_validate',
        // 'work_peer_add',
        // 'work_peers',
        // 'work_peers_clear',
    ],
});
server.start();
