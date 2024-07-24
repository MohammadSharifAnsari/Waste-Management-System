
import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from"cors";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { configDotenv } from "dotenv";
import userroutes from "./routes/userRoutes.js";
const app=express();
configDotenv();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/user',userroutes)

app.use('ping',(req,res,next)=>{
return res.send("pong");
})

app.all('*',(req,res,next)=>{
return res.status(400).send("404 page not found");
})

app.use(errorMiddleware);

export default app;