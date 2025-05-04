import {model , Schema} from 'mongoose';

const paymentSchema = new Schema({
    razorpay_payment_id:{        // we can replace with Payment ID
        type: "String",
        required: true
    },
    razorpay_subscription_id:{
        type: String,
        required: true
    },
    razorpay_signature:{
        type: String,
        required: true
    },
},{
    timestamps: true
});

const payment = model('Payment',paymentSchema);

export default payment;