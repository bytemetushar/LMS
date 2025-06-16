import AppError from "../Utils/error.util.js";
import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";
import crypto from 'crypto';
import { razorpay } from "../server.js";

const getRazorPayApiKey = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'RazorPay API Key',
        key: process.env.RAZORPAY_KEY_ID
    });
};

const buySubscription = async (req, res, next) => {
    try{
        const {id} = req.user;
        const user = await User.findById(id);

        if(!user){
            return next(new AppError('Unauthorized access, please login to access!', 404));
        }
        if(user.role === 'ADMIN'){
            return next(new AppError('Admin cannot buy subscription', 404));
        }

        const user_subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 12,
        });

        user.subscription.id = user_subscription.id;
        user.subscription.status = user_subscription.status; 

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Subscribed successfully',
            subscription_id: user_subscription.id,
        });
    }catch(e){
        return next(new AppError(e.message,500));
    }
};



const verifySubscription = async (req, res, next) => {
    try{
        const {id} = req.user;
        const {razorpay_payment_id, razorpay_signature, razorpay_subscription_id} = req.body;

        const user = await User.findById(id);
        if(!user){
            return next(new AppError('Unauthorized access, please login to access!', 404));
        }

        const subscriptionId  = user.subscription.id; 

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionId}`)
            .digest('hex');

        if(generatedSignature !== razorpay_signature){
            return next(new AppError('Payment not verified, please try again', 500));
        }

        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        });
        
        user.subscription.status = 'active';
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully!'
        });
    }catch(e){
        return next(new AppError(e.message,500));
    }
};




const cancelSubscribe = async (req, res, next) => {
    try{
        const {id} = req.user;
        const user = await User.findById(id);

        if(!user){
            return next(new AppError('unauthorized access, please login!',500));
        }
        if(user.role === 'ADMIN'){
            return next(new AppError('ADMIN can not use this functionality',500))
        }
        const subscriptionId = user.subscription.id;
        try{
            
            const user_subscription = await razorpay.subscriptions.cancel(subscriptionId);
            user.subscription.status = user_subscription.status;
        }catch(e){
            return res.status(200).json({message: e.message});
        }
        

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Your subscription has been canceled!'
        });

    }catch(e){
        return next(new AppError(e.message,500))
    }

};


const allpayment = async (req, res, next) => {
   try{
        const {count} = req.query;
        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10
        });

        res.status(200).json({
            success: true,
            message: 'All payments',
            subscriptions
        })
        
   }catch(e){
        return next(new AppError(e.message,500));
   }

};


export { 
    getRazorPayApiKey, 
    buySubscription, 
    verifySubscription, 
    cancelSubscribe, 
    allpayment 
};