import { Router } from 'express';
import security from './security';
import error from './error';
import api from './api';
import admin from './admin';
import home from './home';
import profile from './profile';
import dev from './dev';
import {
  checkAuthentication, checkAuthenticationArea,
} from '../utils/authentication';
import {base} from "../utils/html";

const router = new Router();

router.use(security);

router.use('/api', api);
router.use('/admin', checkAuthenticationArea('admin'), admin);
// router.use('/me', checkAuthentication, profile);
router.use('/dev', checkAuthenticationArea('dev'), dev);

router.use('/', home);

// handle error pages
// router.use(error);
router.route('*').get((req, res) => {
    res.send(base());
});
export default router;
