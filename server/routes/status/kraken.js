import { Router } from 'express';
import kraken from '../../utils/kraken';
import logger from '../../utils/logger';

const expressKrakenResponse = (req, res, err, succ) => {
  const result = err || succ;

  res.send(result);

  const url = req.originalUrl.replace(/\//g, '-').substring(1);
  logger(url).log(result);
};


const router = new Router();

router.route('/').get((req, res) => {
  // time for sync
  kraken.api('Time', (error, success) => {
    expressKrakenResponse(req, res, error, success);
  });


  // const pair = req.query.pair || 'XXBTZUSD' //XXMRZEUR
  // kraken.api('Ticker', {
  //     pair: pair
  // }, (error, success) => {
  //     expressKrakenResponse(req, res, error, success)
  // });

  // res.json({msg: 'under development'});
});

router.get('/balance', (req, res) => {
  kraken.api('Balance', (error, success) => {
    expressKrakenResponse(req, res, error, success);
  });
});

router.get('/assets', (req, res) => {
  kraken.api('Assets', (error, success) => {
    expressKrakenResponse(req, res, error, success);
  });
});
router.get('/AssetPairs', (req, res) => {
  kraken.api('AssetPairs', (error, success) => {
    expressKrakenResponse(req, res, error, success);
  });
});
router.get('/graph', (req, res) => {
  kraken.api('OHLC', { pair: 'XETHZEUR' }, (error, success) => {
    console.log(error);

    const result = success || error;


    res.send(result);


    // expressKrakenResponse(req, res, error, success)
  });
});

export default router;
