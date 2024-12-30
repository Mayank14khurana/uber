const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const app=express();
const connectToDb=require('./db/db')
const userRoutes=require('./routes/user.route');
const captainRoutes=require('./routes/captain.route');
connectToDb();

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Authorization", "Content-Type"],
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hyy guys');
})
app.use('/user',userRoutes);
app.use('/captain',captainRoutes);

module.exports=app;



