import { ChainName, TypeName } from './names';
import { DEFAULT_DATADIR } from './constants';

export type Value<T extends TypeName> = T extends 'string'
  ? string
  : T extends 'boolean'
  ? boolean
  : T extends 'number'
  ? number
  : T extends 'string[]'
  ? string[]
  : never;

export type NotAllowedIn = { [K in ChainName]?: true };

export type ChainDependentDefaultValue<T extends TypeName> = {
  [K in ChainName]: Value<T>
};

export type DefaultValue<T extends TypeName> =
  | Value<T>
  | ChainDependentDefaultValue<T>
  | undefined;

export type Option<
  T extends TypeName,
  U extends DefaultValue<T>,
  V extends NotAllowedIn
> = {
  typeName: T;
  description: string;
  longName: string;
  defaultValue: U;
  notAllowedIn?: V;
  onlyAppliesToMain?: boolean;
};

const option = <T extends TypeName, U extends DefaultValue<T>, V extends NotAllowedIn>(
  option: Option<T, U, V>,
) => {
  option.description = option.description.replace(/^ */gm, '').replace(/^\n/, '');
  return option;
};

export const BITCOIN_CONFIG_OPTIONS = {
  acceptnonstdtxn: option({
    longName: 'accept non-standard transactions',
    typeName: 'boolean',
    description: 'Relay and mine non-standard transactions',
    defaultValue: false,
    notAllowedIn: {
      main: true,
    },
  }),

  addresstype: option({
    longName: 'address type',
    typeName: 'string',
    description: "'p2sh-segwit' | 'legacy' | 'bech32'",
    defaultValue: 'p2sh-segwit',
  }),

  addnode: option({
    longName: 'add node',
    typeName: 'string[]',
    description: 'Add IP address of node to connect to',
    onlyAppliesToMain: true,
    defaultValue: undefined,
  }),

  addrmantest: option({
    longName: 'address manager test',
    typeName: 'boolean',
    description: 'Allow local address manager relay tests',
    defaultValue: undefined,
  }),

  alertnotify: option({
    longName: 'alert notify',
    typeName: 'string',
    description: `
      Execute a command when an alert or long fork is received.
      "%s" in the command string is replaced by the alert message.`,
    defaultValue: undefined,
  }),

  assumevalid: option({
    longName: 'assume valid',
    typeName: 'string',
    description: `
      Assume that the specified block hash and all its ancestors are valid.
      Set to "0" to verify all blocks. This value should be left empty.`,
    defaultValue: '0',
  }),

  avoidpartialspends: option({
    longName: 'avoid partial spends',
    typeName: 'boolean',
    description: `
      Group outputs by address, selecting all or none, instead of selecting on a
      per-output basis. This improves privacy at the expense of higher transaction fees.`,
    defaultValue: false,
  }),

  banscore: option({
    longName: 'ban score',
    typeName: 'number',
    description: 'Threshold for disconnecting misbehaving peers.',
    defaultValue: 100,
  }),

  bantime: option({
    longName: 'ban time',
    typeName: 'number',
    description: 'Number of seconds to keep misbehaving peers from reconnecting.',
    defaultValue: 86400,
  }),

  bind: option({
    longName: 'bind',
    typeName: 'string',
    description:
      'Bind to given address and always listen on it. Use [host]:port notation for IPv6.',
    onlyAppliesToMain: true,
    defaultValue: undefined,
  }),

  blockmaxweight: option({
    longName: 'block maximum weight',
    typeName: 'number',
    description: 'Set maximum BIP141 block weight.',
    defaultValue: 3000000,
  }),

  blockmintxfee: option({
    longName: 'block minimum transaction fee',
    typeName: 'number',
    description:
      'Set lowest fee rate (in BTC/kB) for transactions to be included in block creation.',
    defaultValue: 0.00001,
  }),

  blocknotify: option({
    longName: 'block notify',
    typeName: 'string',
    description: `
      Execute command when the best block changes.
      "%s" in the command string is replaced by the new block hash.`,
    defaultValue: undefined,
  }),

  blockreconstructionextratxn: option({
    longName: 'block reconstruction extra transactions',
    typeName: 'number',
    description:
      'Number of extra transactions to keep in memory for compact block reconstructions.',
    defaultValue: 100,
  }),

  blocksdir: option({
    longName: 'blocks directions',
    typeName: 'string',
    description: 'Specify a non-default path to store blockchain data.',
    defaultValue: 'blocks',
  }),

  blocksonly: option({
    longName: 'blocks only',
    typeName: 'boolean',
    description: 'Only download and relay blocks. Ignore unconfirmed transactions.',
    defaultValue: false,
  }),

  blockversion: option({
    longName: 'blocks version',
    typeName: 'number',
    description: 'Override block version to test forking scenarios.',
    defaultValue: undefined,
  }),

  bytespersigop: option({
    longName: 'bytes per sigop',
    typeName: 'number',
    description: 'Equivalent bytes per sigop in transactions for relay and mining.',
    defaultValue: 20,
  }),

  changetype: option({
    longName: 'change type',
    typeName: 'string',
    description: 'Change address type: legacy, p2sh-segwit, or bech32.',
    defaultValue: 'p2sh-segwit',
  }),

  checkblocks: option({
    longName: 'check blocks',
    typeName: 'number',
    description: 'Number of recent blocks to check at startup.',
    defaultValue: 6,
  }),

  checklevel: option({
    longName: 'check level',
    typeName: 'number',
    description: 'How thorough the block verification of -checkblocks is (0-4).',
    defaultValue: 3,
  }),

  checkmempool: option({
    longName: 'check mempool',
    typeName: 'number',
    description: 'Run a sanity checks on the mempool every <n> transactions.',
    defaultValue: 0,
  }),

  checkpoints: option({
    longName: 'checkpoints',
    typeName: 'boolean',
    description:
      'Skip verification of pre-checkpoint chain history. See related "assumevalid".',
    defaultValue: true,
  }),

  connect: option({
    longName: 'connect',
    typeName: 'string[]',
    description:
      'Connect only to the specified node(s). Set to ["0"] to disable automatic connections.',
    onlyAppliesToMain: true,
    defaultValue: undefined,
  }),

  daemon: option({
    longName: 'daemon',
    typeName: 'boolean',
    description: 'Spawn bitcoin as a background process',
    defaultValue: false,
  }),

  datacarrier: option({
    longName: 'data carrier',
    typeName: 'boolean',
    description: 'Relay transactions with OP_RETURN outputs.',
    defaultValue: true,
  }),

  datacarriersize: option({
    longName: 'data carrier size',
    typeName: 'number',
    description: 'Maximum size of data in OP_RETURN outputs we relay and mine.',
    defaultValue: 83,
  }),

  datadir: option({
    longName: 'data directory',
    typeName: 'string',
    description: 'Path of a directory for blockchain and other data',
    defaultValue: DEFAULT_DATADIR,
  }),

  dbbatchsize: option({
    longName: 'database batch size',
    typeName: 'number',
    description: 'Maximum database write batch size in bytes.',
    defaultValue: 16777216,
  }),

  dbcache: option({
    longName: 'database cache',
    typeName: 'number',
    description:
      'Database cache size in megabytes. Set as high as possible based upon available RAM.',
    defaultValue: 450,
  }),

  dbcrashratio: option({
    longName: 'database crash ratio',
    typeName: 'number',
    description: 'Randomly crash while writing data at a given rate between 0 and 1.',
    defaultValue: 0,
  }),

  dblogsize: option({
    longName: 'database log size',
    typeName: 'number',
    description:
      'Flush wallet database activity from memory to disk log every <n> megabytes',
    defaultValue: 100,
  }),

  debug: option({
    longName: 'debug',
    typeName: 'string[]',
    description: `
      Enable debug logging for all or specific features. Possible values include:
      0: Disable debug logging.
      1: Enable debug logging for all categories.
      addrman: Enable address manager logging.
      alert: Enable alert logging
      bench: Enable benchmark logging
      cmpctblock: Enable compact block logging
      coindb: Enable coin database logging
      db: Enable database logging
      http: Enable HTTP logging
      leveldb: Enable leveldb logging
      libevent: Enable libevent logging
      lock: Enable lock logging
      mempool: Enable mempool logging
      mempoolrej: Enable mempool rejection logging
      net: Enable network logging
      proxy: Enable proxy logging
      prune: Enable pruning logging
      rand: Enable randomness logging
      reindex: Enable reindexing logging
      rpc: Enable RPC logging
      selectcoins: Enable coin selection logging
      tor: Enable Tor logging
      zmq: Enable ZeroMQ logging`,
    defaultValue: undefined,
  }),

  debugexclude: option({
    longName: 'debug exclude',
    typeName: 'string[]',
    description: 'Disable debugging for a feature',
    defaultValue: undefined,
  }),

  debuglogfile: option({
    longName: 'debug log file',
    typeName: 'string',
    description: 'Location of the debug log',
    defaultValue: 'debug.log',
  }),

  deprecatedrpc: option({
    longName: 'deprecated rpc',
    typeName: 'string[]',
    description: `
      Enable deprecated rpc calls.
      Possible values include:
      accounts
      addwitnessaddress
      signrawtransaction
      validateaddress`,
    defaultValue: undefined,
  }),

  disablewallet: option({
    longName: 'disable wallet',
    typeName: 'boolean',
    description: 'Do not load the wallet and disable wallet RPC calls.',
    defaultValue: false,
  }),

  discardfee: option({
    longName: 'discard fee',
    typeName: 'number',
    description: `
      The fee rate (in BTC/kB) that indicates your tolerance
      for discarding change by adding it to the fee.`,
    defaultValue: 0.0001,
  }),

  discover: option({
    longName: 'discover',
    typeName: 'boolean',
    description:
      'Discover own IP addresses. If disabled, should be used with -externalip or -proxy.',
    defaultValue: true,
  }),

  dns: option({
    longName: 'dns',
    typeName: 'boolean',
    description: 'Allow DNS lookups for -addnode, -seednode and -connect values.',
    defaultValue: true,
  }),

  dnsseed: option({
    longName: 'dns seed',
    typeName: 'boolean',
    description: 'Query for peer addresses via DNS lookup if low on addresses.',
    defaultValue: true,
  }),

  dropmessagestest: option({
    longName: 'drop messages test',
    typeName: 'number',
    description: 'Randomly drop 1 of every <n> network messages.',
    defaultValue: undefined,
  }),

  dustrelayfee: option({
    longName: 'dust relay fee',
    typeName: 'number',
    description: `
      Fee rate (in BTC/kB) used to defined dust, the value of an output such that
      it will cost about 1/3 of its value in fees at this fee rate to spend it.`,
    defaultValue: 0.00001,
  }),

  enablebip61: option({
    longName: 'enable bip61',
    typeName: 'boolean',
    description: 'Send reject messages per BIP61.',
    defaultValue: false,
  }),

  externalip: option({
    longName: 'external ip',
    typeName: 'string',
    description: 'Specify your own public IP address.',
    defaultValue: undefined,
  }),

  fallbackfee: option({
    longName: 'fallback fee',
    typeName: 'number',
    description:
      'A fee rate (in BTC/kB) that will be used when fee estimation has insufficient data',
    defaultValue: 0.0002,
  }),

  feefilter: option({
    longName: 'fee filter',
    typeName: 'boolean',
    description:
      'Tell peer nodes not to send transactions to you that pay less than your mempool min fee.',
    defaultValue: true,
  }),

  flushwallet: option({
    longName: 'flush wallet',
    typeName: 'boolean',
    description: 'Run a thread to flush wallet periodically.',
    defaultValue: true,
  }),

  forcednsseed: option({
    longName: 'force dns seed',
    typeName: 'boolean',
    description: 'Always query for peer addresses via DNS lookup.',
    defaultValue: false,
  }),

  includeconf: option({
    longName: 'include conf',
    typeName: 'string[]',
    description: `
      Load and merge an additional configuration file.
      See https://github.com/bitcoin/bitcoin/pull/10267/files`,
    defaultValue: undefined,
  }),

  incrementalrelayfee: option({
    longName: 'incremental relay fee',
    typeName: 'number',
    description: `
      Fee rate (in BTC/kB) used to define cost of relay.
      Used for mempool limiting and BIP 125 replacement.`,
    defaultValue: 0.00001,
  }),

  keypool: option({
    longName: 'key pool',
    typeName: 'number',
    description: 'Set key pool size.',
    defaultValue: 1000,
  }),

  limitancestorcount: option({
    longName: 'limit ancestor count',
    typeName: 'number',
    description:
      'Do not accept transactions if number of in-mempool ancestors is <n> or more.',
    defaultValue: 25,
  }),

  limitancestorsize: option({
    longName: 'limit ancestor size',
    typeName: 'number',
    description:
      'Do not accept transactions whose size with all in-mempool ancestors exceeds <n> kilobytes.',
    defaultValue: 101,
  }),

  limitdescendantcount: option({
    longName: 'limit descendant count',
    typeName: 'number',
    description:
      'Do not accept transactions if any ancestor would have <n> or more in-mempool descendants.',
    defaultValue: 25,
  }),

  limitdescendantsize: option({
    longName: 'limit descendant size',
    typeName: 'number',
    description:
      'Do not accept transactions whose size with all in-mempool descendants exceeds <n> kilobytes.',
    defaultValue: 101,
  }),

  listen: option({
    longName: 'listen',
    typeName: 'boolean',
    description: 'Accept incoming connections from peers.',
    defaultValue: true,
  }),

  listenonion: option({
    longName: 'listen onion',
    typeName: 'boolean',
    description: 'Automatically create Tor hidden service.',
    defaultValue: true,
  }),

  loadblock: option({
    longName: 'load block',
    typeName: 'string[]',
    description: 'Import blocks from external ".dat" file on startup.',
    defaultValue: undefined,
  }),

  logips: option({
    longName: 'log ips',
    typeName: 'boolean',
    description: 'Log IP Addresses in debug output.',
    defaultValue: false,
  }),

  logtimemicros: option({
    longName: 'log timestamps in microseconds',
    typeName: 'boolean',
    description: 'Log timestamps with microsecond precision.',
    defaultValue: false,
  }),

  logtimestamps: option({
    longName: 'log timestamps',
    typeName: 'boolean',
    description: 'Log timestamps in debug output.',
    defaultValue: true,
  }),

  maxconnections: option({
    longName: 'maximum connections',
    typeName: 'number',
    description: 'Maintain at most this many connections to peers.',
    defaultValue: 125,
  }),

  maxmempool: option({
    longName: 'maximum mempool',
    typeName: 'number',
    description: 'Maximum allowed size of the mempool in megabytes.',
    defaultValue: 300,
  }),

  maxorphantx: option({
    longName: 'maximum orphan transactions',
    typeName: 'number',
    description: 'Keep at most this many orphan transactions in memory.',
    defaultValue: 100,
  }),

  maxreceivebuffer: option({
    longName: 'maximum receive buffer',
    typeName: 'number',
    description: 'Maximum per-connection receive buffer size in KiB.',
    defaultValue: 5000,
  }),

  maxsendbuffer: option({
    longName: 'maximum send buffer',
    typeName: 'number',
    description: 'Maximum per-connection send buffer size in KiB.',
    defaultValue: 1000,
  }),

  maxsigcachesize: option({
    longName: 'maximum signature cache size',
    typeName: 'number',
    description: 'Limit size of signature cache to this many MiB.',
    defaultValue: 32,
  }),

  maxtimeadjustment: option({
    longName: 'maximum time adjustment',
    typeName: 'number',
    description: `
      Maximum allowed median peer time offset adjustment in seconds.
      Local perspective of time may be influenced by peers forward or backward by this amount.`,
    defaultValue: 4200,
  }),

  maxtipage: option({
    longName: 'maximum tip age',
    typeName: 'number',
    description: 'Maximum tip age in seconds to consider node in initial block download.',

    defaultValue: 86400,
  }),

  maxtxfee: option({
    longName: 'maximum transaction fee',
    typeName: 'number',
    description: `
      Maximum total fees (in BTC) to use in a single wallet or raw transaction
      Setting this too low may abort large transactions.`,
    defaultValue: 0.1,
  }),

  maxuploadtarget: option({
    longName: 'maximum upload target',
    typeName: 'number',
    description:
      'Tries to keep outbound traffic under the given target in MiB per 24h. 0 means no limit.',
    defaultValue: 0,
  }),

  mempoolexpiry: option({
    longName: 'mempool expiry',
    typeName: 'number',
    description: 'Do not keep transactions in the mempool longer than this many hours.',
    defaultValue: 336,
  }),

  mempoolreplacement: option({
    longName: 'mempool replacement',
    typeName: 'boolean',
    description: 'Allow transaction replacement in the memory pool.',
    defaultValue: true,
  }),

  minimumchainwork: option({
    longName: 'minimum chain work',
    typeName: 'string',
    description:
      'The minimum amount of cumulative proof of work required as a "0x" hex string.',
    defaultValue: '0x000000000000000000000000000000000000000000f91c579d57cad4bc5278cc',
  }),

  minrelaytxfee: option({
    longName: 'minimum relay transaction fee',
    typeName: 'number',
    description: `
      Fee rates (in BTC/kB) smaller than this are considered zero fee
      for relaying, mining and transaction creation.`,
    defaultValue: 0.00001,
  }),

  mintxfee: option({
    longName: 'minimum transaction fee',
    typeName: 'number',
    description:
      'Fee rates (in BTC/kB) smaller than this are considered zero fee for transaction creation',
    defaultValue: 0.00001,
  }),

  mocktime: option({
    longName: 'mock time',
    typeName: 'boolean',
    description: 'Replace actual UNIX time with this value.',
    defaultValue: false,
  }),

  onion: option({
    longName: 'onion',
    typeName: 'string',
    description:
      'Use separate SOCKS5 proxy <ip:port> to reach peers via Tor hidden services.',
    defaultValue: undefined,
  }),

  onlynet: option({
    longName: 'only network',
    typeName: 'string',
    description: `
      Only use the specified network type. Possible values include:
      any: Use every available network
      ipv4: Only connect to peers via IPV4
      ipv6: Only connect to peers via IPV6.
      onion: Only connect to peers via Tor.`,
    defaultValue: 'any',
  }),

  par: option({
    longName: 'parallelization',
    typeName: 'number',
    description: `
      Set the number of threads used for script verification.
      1 means CPU_CORES.
      0 means automatic.
      Less than 0 means leave that many cores free.`,
    defaultValue: 0,
  }),

  paytxfee: option({
    longName: 'pay transaction fee',
    typeName: 'number',
    description: `
      Fee rate (in BTC/kB) to add to transactions you send.
      It's recommended to leave this value at 0 or empty.`,
    defaultValue: 0,
  }),

  peerbloomfilters: option({
    longName: 'peer bloom filters',
    typeName: 'boolean',
    description: 'Support filtering of blocks and transactions with bloom filters.',
    defaultValue: true,
  }),

  permitbaremultisig: option({
    longName: 'permit bare multisig',
    typeName: 'boolean',
    description: 'Relay non-P2SH multisig transactions.',
    defaultValue: true,
  }),

  persistmempool: option({
    longName: 'persist mempool',
    typeName: 'boolean',
    description: 'Save the mempool on shutdown and load on restart.',
    defaultValue: true,
  }),

  pid: option({
    longName: 'pid',
    typeName: 'string',
    description: 'Specify process ID file name. Ignored on Windows.',
    defaultValue: 'bitcoind.pid',
  }),

  port: option({
    longName: 'port',
    typeName: 'number',
    description: 'Listen for incoming connections on the specified port number.',
    defaultValue: {
      main: 8333,
      test: 18333,
      regtest: 18444,
    },
    onlyAppliesToMain: true,
  }),

  printpriority: option({
    longName: 'print priority',
    typeName: 'boolean',
    description: 'Log transaction fee per kB when mining blocks.',
    defaultValue: false,
  }),

  printtoconsole: option({
    longName: 'print to console',
    typeName: 'boolean',
    description: 'Send trace/debug info to console instead of debug.log.',
    defaultValue: false,
  }),

  privdb: option({
    longName: 'private database',
    typeName: 'boolean',
    description: 'Set the DB_PRIVATE flag in the wallet database environment.',
    defaultValue: true,
  }),

  promiscuousmempoolflags: option({
    longName: 'promiscuous mempool flags',
    typeName: 'number',
    description: `
      Integer representing the script verification flags to enable all OR'ed together.
      Flags can be found in interpreter.h.`,
    defaultValue: undefined,
  }),

  proxy: option({
    longName: 'proxy',
    typeName: 'string',
    description: 'Connect through <ip:port> SOCKS5 proxy.',
    defaultValue: undefined,
  }),

  proxyrandomize: option({
    longName: 'proxy randomize',
    typeName: 'boolean',
    description:
      'Randomize credentials for every proxy connection. This enables Tor stream isolation.',
    defaultValue: true,
  }),

  prune: option({
    longName: 'prune',
    typeName: 'number',
    description: `
      Reduce storage requirements by only storing this many MiB of blocks.
      This mode is incompatible with -txindex and -rescan.
      WARNING: Reverting this setting requires re-downloading the entire blockchain.
      0 means disable pruning blocks
      1 means allow manual pruning via RPC
      > 550 means automatically prune blocks to stay under target size`,
    defaultValue: 0,
  }),

  regtest: option({
    longName: 'regtest',
    typeName: 'boolean',
    description: 'Run this node on its own independent test network.',
    defaultValue: false,
    notAllowedIn: {
      main: true,
      regtest: true,
      test: true,
    },
  }),

  reindex: option({
    longName: 'reindex',
    typeName: 'boolean',
    description:
      'Rebuild chain state and block index from the block .dat files on disk. WARNING: very slow!',
    defaultValue: false,
  }),

  'reindex-chainstate': option({
    longName: 'reindex chainstate',
    typeName: 'boolean',
    description:
      'Reindex chain state from the currently indexed blocks. WARNING: very slow!',
    defaultValue: false,
  }),

  rescan: option({
    longName: 'rescan',
    typeName: 'boolean',
    description:
      'Rescan the blockchain for missing wallet transactions on startup. WARNING: very slow!',
    defaultValue: false,
  }),

  rest: option({
    longName: 'rest',
    typeName: 'boolean',
    description: 'Accept public REST requests.',
    defaultValue: false,
  }),

  rootcertificates: option({
    longName: 'root certificates',
    typeName: 'string',
    description: `
      Specify a custom root certificates file to trust for payment requests.
      Delete value to disable trusting root certificates.`,
    defaultValue: '-system-',
  }),

  rpcallowip: option({
    longName: 'rpc allow ip',
    typeName: 'string[]',
    description: `
      Allow JSON-RPC connections from specified source.
      Valid for <ip> are:
      a single IP (e.g. 1.2.3.4)
      a network/netmask (e.g. 1.2.3.4/255.255.255.0)
      a network/CIDR (e.g. 1.2.3.4/24)`,
    defaultValue: undefined,
  }),

  rpcauth: option({
    longName: 'rpc authorization',
    typeName: 'string[]',
    description: `
      Username and hashed password for JSON-RPC connections.
      Each item has the form "<USERNAME>:<SALT>$<HASH>".
      RPC clients connect using the usual http basic authentication.
      You can generate these values with the ./share/rpcauth/rpcauth.py script.`,
    defaultValue: undefined,
  }),

  rpcbind: option({
    longName: 'rpc bind',
    typeName: 'string[]',
    description: `
      Bind to given <addr>[:port] to listen for JSON-RPC connections.
      This option is ignored unless -rpcallowip is also passed.
      The [:port] part is optional and overrides -rpcport if provided.`,
    onlyAppliesToMain: true,
    defaultValue: ['127.0.0.1', '::1'],
  }),

  rpcclienttimeout: option({
    longName: 'rpc client timeout',
    typeName: 'number',
    description: 'Timeout in seconds during HTTP requests, or 0 for no timeout.',
    defaultValue: 900,
  }),

  rpcconnect: option({
    longName: 'rpc connect',
    typeName: 'string',
    description: 'Send commands to node running on <ip>',
    defaultValue: '127.0.0.1',
  }),

  rpccookiefile: option({
    longName: 'rpc cookie file',
    typeName: 'string',
    description: 'Location of the RPC auth cookie',
    defaultValue: '.cookie',
  }),

  rpcpassword: option({
    longName: 'rpc password',
    typeName: 'string',
    description:
      'Specify a plain-text RPC basic auth password. Disables RPC "cookie-based" authentication.',
    defaultValue: undefined,
  }),

  rpcport: option({
    longName: 'rpc port',
    typeName: 'number',
    description: 'Listen for JSON-RPC connections on this port.',
    onlyAppliesToMain: true,
    defaultValue: {
      main: 8332,
      test: 18332,
      regtest: 18443,
    },
  }),

  rpcserialversion: option({
    longName: 'rpc serialization version',
    typeName: 'number',
    description: `
      0: Return raw transaction or block hex with non-SegWit serialization.
      1: Return raw transaction or block hex with SegWit serialization.`,
    defaultValue: 1,
  }),

  rpcservertimeout: option({
    longName: 'rpc server timeout',
    typeName: 'number',
    description: 'Number of seconds after which an uncompleted RPC call will time out',
    defaultValue: 30,
  }),

  rpcthreads: option({
    longName: 'rpc threads',
    typeName: 'number',
    description: 'Number of threads for handling RPC calls.',
    defaultValue: 4,
  }),

  rpcuser: option({
    longName: 'rpc user',
    typeName: 'string',
    description: 'Specify username for RPC http basic authentication',
    defaultValue: '',
  }),

  rpcwait: option({
    longName: 'rpc wait',
    typeName: 'boolean',
    description: 'Wait for RPC server to start',
    defaultValue: false,
  }),

  rpcworkqueue: option({
    longName: 'rpc work queue',
    typeName: 'number',
    description: 'Set the depth of the work queue to service RPC calls',
    defaultValue: 16,
  }),

  salvagewallet: option({
    longName: 'salvage wallet',
    typeName: 'boolean',
    description: 'Attempt to recover private keys from a corrupt wallet on startup.',
    defaultValue: false,
  }),

  seednode: option({
    longName: 'seed node',
    typeName: 'string',
    description: 'Connect to the specified IP address to retrieve peer addresses.',
    defaultValue: undefined,
  }),

  server: option({
    longName: 'server',
    typeName: 'boolean',
    description: `
      Unlike bitcoind for which the JSON-RPC interface is enabled by default
      when a node is launched via bitcoin-qt the JSON-RPC interface is disabled
      unless "server" is set to "1" (true). Simlarly setting "server" to "0" (false)
      disables the JSON-RPC interface when the node is launched via bitcoind.`,
    defaultValue: undefined,
  }),

  shrinkdebugfile: option({
    longName: 'shrink debug file',
    typeName: 'boolean',
    description: 'Shrink debug.log file on startup.',
    defaultValue: true,
  }),

  spendzeroconfchange: option({
    longName: 'spend zero-confirmation change',
    typeName: 'boolean',
    description: 'Spend unconfirmed change when sending transactions.',
    defaultValue: true,
  }),

  stopafterblockimport: option({
    longName: 'stop after block import',
    typeName: 'boolean',
    description: 'Stop running after importing blocks from disk.',
    defaultValue: false,
  }),

  stopatheight: option({
    longName: 'stop at height',
    typeName: 'number',
    description: 'Stop running after reaching the given height in the main chain.',
    defaultValue: 0,
  }),

  sysperms: option({
    longName: 'system permissions',
    typeName: 'boolean',
    description:
      'Create new files with system default permissions. Only effective if wallet is disabled.',
    defaultValue: false,
  }),

  testnet: option({
    longName: 'testnet',
    typeName: 'boolean',
    description: 'Run this node on the Bitcoin Test Network.',
    defaultValue: false,
    notAllowedIn: {
      main: true,
      regtest: true,
      test: true,
    },
  }),

  timeout: option({
    longName: 'timeout',
    typeName: 'number',
    description: 'Peer connection timeout in milliseconds.',
    defaultValue: 5000,
  }),

  torcontrol: option({
    longName: 'tor control',
    typeName: 'string',
    description: 'Tor control <ip:port> to use if onion listening enabled.',
    defaultValue: '127.0.0.1:9051',
  }),

  torpassword: option({
    longName: 'tor password',
    typeName: 'string',
    description: 'Tor control port password.',
    defaultValue: undefined,
  }),

  txconfirmtarget: option({
    longName: 'transaction confirmation target',
    typeName: 'number',
    description: `
      If paytxfee is not set, include enough fee so that
      transactions should confirm within this many blocks.`,
    defaultValue: 6,
  }),

  txindex: option({
    longName: 'transaction index',
    typeName: 'boolean',
    description:
      'Maintain a full transaction index. Used by the getrawtransaction rpc call.',
    defaultValue: false,
  }),

  uacomment: option({
    longName: 'user agent comment',
    typeName: 'string[]',
    description: 'Append a comment to the user agent string.',
    defaultValue: undefined,
  }),

  upgradewallet: option({
    longName: 'upgrade wallet',
    typeName: 'boolean',
    description: 'Upgrade wallet to latest format on startup.',
    defaultValue: true,
  }),

  upnp: option({
    longName: 'upnp',
    typeName: 'boolean',
    description: 'Use UPnP to map the listening port.',
    defaultValue: false,
  }),

  vbparams: option({
    longName: 'version bits parameters',
    typeName: 'string[]',
    description: `
      Use given start/end times for specified version bits deployment.
      Regtest mode only. Format <deployment:start:end>`,
    notAllowedIn: {
      main: true,
    },
    defaultValue: undefined,
  }),

  wallet: option({
    longName: 'wallet',
    typeName: 'string[]',
    description: `
      Specify wallet database path. Path is interpreted relative to <walletdir> if not absolute.
      Path will be created if it does not exist.`,
    onlyAppliesToMain: true,
    defaultValue: undefined,
  }),

  walletbroadcast: option({
    longName: 'wallet broadcast',
    typeName: 'boolean',
    description: 'Broadcast transactions created by the wallet.',
    defaultValue: true,
  }),

  walletdir: option({
    longName: 'wallet directory',
    typeName: 'string',
    description: 'Specify a non-default location to store wallet data.',
    defaultValue: 'wallets',
  }),

  walletnotify: option({
    longName: 'wallet notify',
    typeName: 'string',
    description: `
      Execute command when a wallet transaction changes.
      "%s" in command string is replaced by transaction ID.`,
    defaultValue: undefined,
  }),

  walletrbf: option({
    longName: 'wallet replace-by-fee',
    typeName: 'boolean',
    description: 'Send transactions with full replace-by-fee opt-in enabled.',
    defaultValue: true,
  }),

  walletrejectlongchains: option({
    longName: 'wallet reject long chains',
    typeName: 'boolean',
    description: 'Wallet will not create transactions that violate mempool chain limits.',
    defaultValue: true,
  }),

  whitebind: option({
    longName: 'whitelist bind',
    typeName: 'string',
    description:
      'Bind to given address and whitelist peers connecting to it. Use [host]:port notation for IPv6.',
    defaultValue: undefined,
  }),

  whitelist: option({
    longName: 'whitelist',
    typeName: 'string[]',
    description: `
      Whitelist peers connecting from the given IP address (e.g. 1.2.3.4)
      or CIDR notated network (e.g. 1.2.3.0/24). Whitelisted peers cannot be DoS banned.
      Their transactions are always relayed, even if they are already in the mempool.
      This option is useful for a gateway node.
    `,
    defaultValue: undefined,
  }),

  whitelistforcerelay: option({
    longName: 'whitelist force relay',
    typeName: 'boolean',
    description:
      'Force relay of transactions from whitelisted peers even if they violate local relay policy.',
    defaultValue: true,
  }),

  whitelistrelay: option({
    longName: 'whitelist relay',
    typeName: 'boolean',
    description:
      'Accept relayed transactions received from whitelisted peers even when not relaying transactions.',
    defaultValue: true,
  }),

  zapwallettxes: option({
    longName: 'zap wallet transactions',
    typeName: 'number',
    description: `
      Delete all wallet transactions and only recover those 
      parts of the blockchain through -rescan on startup.
      1 means keep all transaction metadata.
      2 means drop transaction metadata.`,
    defaultValue: undefined,
  }),

  zmqpubhashblock: option({
    longName: 'zeromq publish hash block',
    typeName: 'string',
    description: 'Enable publishing of block hashes to <address>.',
    defaultValue: undefined,
  }),

  zmqpubhashtx: option({
    longName: 'zeromq publish hash transaction',
    typeName: 'string',
    description: 'Enable publishing of transaction hashes to <address>.',
    defaultValue: undefined,
  }),

  zmqpubrawblock: option({
    longName: 'zeromq publish raw block',
    typeName: 'string',
    description: 'Enable publishing of raw block hex to <address>.',
    defaultValue: undefined,
  }),

  zmqpubrawtx: option({
    longName: 'zeromq publish raw transaction',
    typeName: 'string',
    description: 'Enable publishing of raw transaction hex to <address>.',
    defaultValue: undefined,
  }),
};
