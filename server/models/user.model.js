import { Schema, get, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    fullName: {
        type: "String",
        required: [true, "Name is required"],
        minLength: [5,"Name must be at least 5 character"],
        maxLength: [20, "Name can not be exceed to 20 character"],
        lowercase: true,
        trim: true
    },
    email: {
        type: "String",
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: "String",
        required: [true,'password is required'],
        minLength: [8, 'Password must be greater than 8 Character'],
        select: false
    },
    avatar: {
        public_id: {
            type: "String"
        },
        secure_url: {
            type: "String"
        }
    },
    role: {
        type: "String",
        enum: ['User','ADMIN'],
        default: 'User'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription:{
        id: String,
        status: String
    }
},{
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods ={
    generateJWTToken: async function(){
        return await jwt.sign({
                id: this._id,
                email: this.email,
                subscription: this.subscription,
                role: this.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )
    },
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password);
    },

    generateResetPasswordToken: async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

        return resetToken;
    }

}
const User = model('User', userSchema);

export default User;