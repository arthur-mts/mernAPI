import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'express-async-errors';


import routes from './routes';
import HttpError, { HttpStatusCode } from './exceptions/HttpError';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URL!, { useUnifiedTopology: true,useNewUrlParser: true });

app.use(cors());

app.use(express.json());

app.use((req, __res, next) => {
  console.log(`${req.method} ON ${req.url}`);
  next();
});

app.use(routes);

app.use((err: any, __req : Request, res : Response, nxt: NextFunction) => {
  if(!err) 
    return nxt();

  // TYPESCRIPT HAVE TROUBLES WITH INHERITANCE OF ERRORS SINCE 2.1 VERSION
  // https://stackoverflow.com/questions/43912118/inherit-from-error-breaks-instanceof-check-in-typescript

  //if(err instanceof HttpError){
  //  return res.status(err.statusCode).json({ message: err.message });
  //}
  
  // Check if is a HttpError
  if(err.statusCode)
    return res.status(err.statusCode).json({ message: err.message });
  
    
  console.log(err);  
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });    
});

app.listen(Number(process.env.PORT || '3333'), ()=>{
  console.log('Server on!');
})
