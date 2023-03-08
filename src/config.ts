import { NextFunction, Request, Response } from 'express';

export type NanoProxyServerConfig = {
    /** Server message emitted when app starts listening on `port`. */
    APP_LISTENING_MSG: (port: number) => string;

    /** Server is expected to serve external requests. */
    IS_PRODUCTION: boolean;

    /** Nano/Banano Node RPC URL */
    NANO_RPC_URL: string;

    /** Server port when ran locally for development purposes. */
    APP_DEV_PORT: number;

    /** Server port when listening to outside requests. */
    APP_PROD_PORT: number;

    /** URL path where the app is served.  Example: http://[YOUR-IP]:[APP_DEV_PORT | APP_PROD_PORT]/[APP_PATH] */
    APP_PATH: string;

    /**
       List of enabled websites that can bypass server CORS restriction.
       CORS is not enforced when server is ran in development-mode.
    */
    URL_WHITE_LIST: string[];

    /**
       List of actions we can use with Nano RPC Protocol,
       Full list of actions & descriptions here: https://docs.nano.org/commands/rpc-protocol
     */
    ALLOWED_ACTIONS: AllowedActions[];

    /**
     * Optional function ran to security-check incoming requests.
     * Runs after the CORS filter.
     */
    REQUEST_FILTER?: (req: Request, res: Response, next: NextFunction) => void;
};

export type AllowedActions =
    | 'account_balance'
    | 'account_block_count'
    | 'account_count'
    | 'account_create'
    | 'account_get'
    | 'account_history'
    | 'account_info'
    | 'account_key'
    | 'account_list'
    | 'account_move'
    | 'account_remove'
    | 'account_representative'
    | 'account_representative_set'
    | 'account_weight'
    | 'accounts_balances'
    | 'accounts_create'
    | 'accounts_frontiers'
    | 'accounts_pending'
    | 'available_supply'
    | 'block'
    | 'block_account'
    | 'block_confirm'
    | 'block_count'
    | 'block_count_type' /* Removed in V22 */
    | 'block_create'
    | 'block_hash'
    | 'blocks'
    | 'block_info'
    | 'blocks_info'
    | 'successors'
    | 'bootstrap'
    | 'bootstrap_any'
    | 'bootstrap_lazy'
    | 'bootstrap_status'
    | 'chain'
    | 'confirmation_active'
    | 'confirmation_height_currently_processing'
    | 'confirmation_history'
    | 'confirmation_info'
    | 'confirmation_quorum'
    | 'database_txn_tracker'
    | 'delegators'
    | 'delegators_count'
    | 'deterministic_key'
    | 'epoch_upgrade'
    | 'frontier_count'
    | 'frontiers'
    | 'history'
    | 'keepalive'
    | 'key_create'
    | 'key_expand'
    | 'krai_from_raw'
    | 'krai_to_raw'
    | 'ledger'
    | 'node_id'
    | 'node_id_delete'
    | 'mrai_from_raw'
    | 'mrai_to_raw'
    | 'password_change'
    | 'password_enter'
    | 'password_valid'
    | 'payment_begin' /* Removed in V22 */
    | 'payment_init' /* Removed in V22 */
    | 'payment_end' /* Removed in V22 */
    | 'payment_wait' /* Removed in V22 */
    | 'peers'
    | 'pending'
    | 'pending_exists'
    | 'process'
    | 'rai_from_raw'
    | 'rai_to_raw'
    | 'receive'
    | 'receive_minimum'
    | 'receive_minimum_set'
    | 'representatives'
    | 'representatives_online'
    | 'republish'
    | 'search_pending'
    | 'search_pending_all'
    | 'send'
    | 'sign'
    | 'stats'
    | 'stats_clear'
    | 'stop'
    | 'successors'
    | 'telemetry'
    | 'validate_account_number'
    | 'version'
    | 'unchecked'
    | 'unchecked_clear'
    | 'unchecked_get'
    | 'unchecked_keys'
    | 'unopened'
    | 'uptime'
    | 'wallet_add'
    | 'wallet_add_watch'
    | 'wallet_balances'
    | 'wallet_change_seed'
    | 'wallet_contains'
    | 'wallet_create'
    | 'wallet_destroy'
    | 'wallet_export'
    | 'wallet_frontiers'
    | 'wallet_history'
    | 'wallet_info'
    | 'wallet_key_valid'
    | 'wallet_ledger'
    | 'wallet_lock'
    | 'wallet_locked'
    | 'wallet_pending'
    | 'wallet_representative'
    | 'wallet_representative_set'
    | 'wallet_republish'
    | 'wallet_work_get'
    | 'work_cancel'
    | 'work_generate'
    | 'work_get'
    | 'work_peer_add'
    | 'work_peers'
    | 'work_peers_clear'
    | 'work_set'
    | 'work_validate';
