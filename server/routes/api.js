import {Router} from 'express';
import kraken from '../utils/kraken';
import logger from '../utils/logger';
import mongoStatus from './status/mongo'

const expressKrakenResponse = (req, res, err, succ) => {
    let result = err ? err : succ


    res.send(result)

    let url = req.originalUrl.replace(/\//g, '-').substring(1)
    logger(url).log(result)

}


const router = new Router();
router.use('/mongo', mongoStatus);

router.route('/').get((req, res) => {
    res.redirect(req.baseUrl + '/status');
});

// status
router.route('/status').get((req, res) => {
    res.json({msg: 'api status ok'});
});

router.route('/status/kraken').get((req, res) => {

    // time for sync
    kraken.api('Time', (error, success) => {
        expressKrakenResponse(req, res, error, success)
    });


    // const pair = req.query.pair || 'XXBTZUSD' //XXMRZEUR
    // kraken.api('Ticker', {
    //     pair: pair
    // }, (error, success) => {
    //     expressKrakenResponse(req, res, error, success)
    // });

    // res.json({msg: 'under development'});
});

router.get('/status/kraken/balance', (req, res) => {
    kraken.api('Balance', (error, success) => {
        expressKrakenResponse(req, res, error, success)
    });
})

router.get('/status/kraken/assets', (req, res) => {
    kraken.api('Assets', (error, success) => {
        expressKrakenResponse(req, res, error, success)
    });
})
router.get('/status/kraken/AssetPairs', (req, res) => {
    kraken.api('AssetPairs', (error, success) => {
        expressKrakenResponse(req, res, error, success)
    });
})
router.get('/status/kraken/graph', (req, res) => {
    kraken.api('OHLC', {pair: 'XETHZEUR'}, (error, success) => {
        console.log(error);

        let result = success ? success : error


        res.send(result)


        // expressKrakenResponse(req, res, error, success)
    });
})

export default router;
