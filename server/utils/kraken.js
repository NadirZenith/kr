import KrakenClient from '../library/KrakenClient';
import config from '../config';

const kraken = new KrakenClient(config.kraken.key, config.kraken.secret);

export default kraken;
