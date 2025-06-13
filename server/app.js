import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import morgan from 'morgan';
config();
import userRoute from './routes/user.routes.js'
import courseRoute from './routes/course.routes.js'
import miscRoutes from './routes/miscellaneous.routes.js'
import paymentRoute from './routes/payment.routes.js'
import errorMiddleware from './middlewares/error.middleware.js';

import dotenv from 'dotenv';    // import dotenv

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(cookieParser());

app.use(morgan('dev'));

app.use('/ping',function(req,res){
    res.send('/pong');
})

app.use('/api/v1/user', userRoute);
app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/payments', paymentRoute);
app.use('/api/v1/', miscRoutes);


app.all('*',(req,res) =>{
    res.status(404).send("OOPS! 404 Page not found");
})

app.use(errorMiddleware);

export default  app;