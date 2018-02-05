import { Router } from 'express';
import mongoose from 'mongoose';
import Tag from '../../app/model/tag';

const router = new Router();

router.route('/').get((req, res) => {
  res.redirect(`${req.baseUrl}/status`);
});

// status
router.route('/status').get((req, res) => {
  // console.log(tags);
  // Output -> 0 = disconnected, 1 = connected,
  // 2 = connecting, 3 = disconnecting, 4 =? invalid credentials
  res.json({ msg: `mongo status: ${mongoose.connection.readyState}` });
});

const handleDbResponse = (err, tag, res) => {
  if (err) {
    res.json({ error: true, msg: err.message });

    return false;
  }
  res.json({ msg: 'tag saved', tag });

  return true;
};

// create
router.route('/create').get((req, res) => {
  const tag = new Tag({
    name: req.query.name,
    slug: req.query.slug || req.query.name,
  });

  tag.save((err, _tag) => handleDbResponse(err, _tag, res));
});

export default router;
