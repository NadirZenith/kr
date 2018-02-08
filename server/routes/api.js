import { Router } from 'express';
import mongoStatus from './status/mongo';
import krakenStatus from './status/kraken';

const router = new Router();

router.route('/').get((req, res) => {
  res.redirect(`${req.baseUrl}/status`);
});

// status
router.route('/status').get((req, res) => {
  res.json({ code: 200, msg: 'api status ok' });
});


router.use('/mongo', mongoStatus);
router.use('/kraken', krakenStatus);

export default router;
