const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path')
const signupRouter=require("./router/signuprouter");
const profileRouter=require("./router/profilerouter");


app.use(cors());
mongoose.connect("mongodb://localhost:27017/database")
.then(()=>{
    console.log("Mongodb connected")
})
.catch((err)=>{
    console.log("error oocured while connecting the mongo")
})

app.use('/',signupRouter)
app.use('/profile',profileRouter)

app.use(express.static('upload'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('my-app/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(_dirname,'my-app','build','index.html'))
    })
}

app.listen(8085,()=>{
    console.log("starting server at port 8085");
});