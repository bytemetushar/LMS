import {Router} from 'express';
import {getRazorPayApiKey, buySubscription, verifySubscription, cancelSubscribe, allpayment} from '../controllers/payment.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';


const router = Router();

router.route('/razorpay-key')
    .get(isLoggedIn ,getRazorPayApiKey);


router.route('/subscribe')
    .post(isLoggedIn ,buySubscription);


router.route('/verify')
    .post(isLoggedIn ,verifySubscription);

router.route('/unsubscribe')
    .post(isLoggedIn , cancelSubscribe);
router.route('/')
    .get(isLoggedIn, authorizedRoles('ADMIN'), allpayment); 


export default router;