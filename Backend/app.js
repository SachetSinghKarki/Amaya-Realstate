import express from 'express';
import cors from 'cors'
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true,  // Allow cookies & auth headers
}));
app.use(express.json());
app.use(cookieParser());




app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);


mongoose.connect(process.env.MONGO_URI)
   .then(()=> {
    app.listen(process.env.PORT, () => console.log('Connected to db & Server running on port', process.env.PORT));
   })
   .catch(err =>
     console.error(err)
    );
