const express=require('express');
const app=express.Router();
const multer = require("multer");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const staffapi=require('../api/staffapi');
const customerapi=require('../api/customerapi');

//definition of multer

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
    });
    const upload=multer({storage:storage});

    //to route the staff form data
app.post("/staffform",upload.single('images'),async (req,res)=>{
    try{
        console.log("inside stafform router",req.body);
        req.body.images=req.file.originalname;
        let data=await staffapi.finddata({email:req.body.email})
        console.log("data ndskfdsf",data)
        if(data.length > 0){
            res.status(200).send("Email id already exists")
        }
        else{
            const userdata=await staffapi.savedata(req.body)
            res.status(200).send("Registered Successfully");
        }
    }
    catch(err){
        console.log("error in staffform router",err)
        res.status(404).send(err);

    }
}),


//to route the customer form data
app.post("/customerform",upload.single('images'),async (req,res)=>{
    try{
        console.log("inside customer form router",req.body);
        req.body.images=req.file.originalname;
        let data=await customerapi.finddata({email:req.body.email})
        console.log("data ndskfdsf",data)
        if(data.length > 0){
            res.status(200).send("Email id already exists")
        }
        else{
            const userdata=await customerapi.savedata(req.body)
            res.status(200).send("Registered Successfully");
        }
    }
    catch(err){
        console.log("error in customer form router",err)
        res.status(404).send(err);

    }
}),
// to get the details of staff
app.post('/stafffind',async (req,res)=>{
    try{
        console.log("inside uploadpost router of staff",req.body);
        const userdata=await staffapi.finddata(req.body)
        res.status(200).send({userdata});
    }
    catch(err){
        console.log("error in staffform fetch router",err)
        res.status(404).send(err);
    }
}),
// to get the details of customer
app.post('/customerfind',async (req,res)=>{
    try{
        console.log("inside uploadpost router of customer",req.body);
        const userdata=await customerapi.finddata(req.body)
        res.status(200).send({userdata});
    }
    catch(err){
        console.log("error in customerform fetch router",err)
        res.status(404).send(err);
    }
}),
//to search the detail of staff
app.post('/searchstaff',async (req,res)=>{
    try{
        console.log("inside search router of staff",req.body);
        const staffdata=await staffapi.findsearchdata(req.body)
        console.log("data back ",staffdata)
        res.status(200).send({staffdata});
    }
    catch(err){
        console.log("error in staff search  router",err)
        res.status(404).send(err);
    }
}),
//to search the detail of customers
app.post('/searchcustomer',async (req,res)=>{
    try{
        console.log("inside search router of customer",req.body);
        const customerdata=await customerapi.findsearchdata(req.body)
        console.log("data back ",customerdata)
        res.status(200).send({customerdata});
    }
    catch(err){
        console.log("error in customer search router",err)
        res.status(404).send(err);
    }
}),

//to delete the record of staff
app.post('/deletestaff',async (req,res)=>{
    try{
        console.log("inside search router of staff",req.body);
        const staffdata=await staffapi.deletedata(req.body)
        console.log("data back ",staffdata)
        res.status(200).send("Data deleted");
    }
    catch(err){
        console.log("error in staff search router",err)
        res.status(404).send(err);
    }
}),
//to delete the record of customer
app.post('/deletecustomer',async (req,res)=>{
    try{
        console.log("inside search router of customer",req.body);
        const customerdata=await customerapi.deletedata(req.body)
        console.log("data back ",customerdata)
        res.status(200).send("Data deleted");
    }
    catch(err){
        console.log("error in customer search router",err)
        res.status(404).send(err);
    }
}),

//to edit the staff data
app.post("/editstaff",upload.single('images'),async (req,res)=>{
    try{
        console.log("inside staff edit router",req.body,req.file);
        if(req.file !== undefined)
        {
            req.body.images=req.file.originalname;
        }
        const userdata=await staffapi.changedata({_id:req.body.id},req.body)
        res.status(200).send("Changed Successfully");
    }
    catch(err){
        console.log("error in staff edit router",err)
        res.status(404).send(err);
    }
}),

//to edit the customer data
app.post("/editcustomer",upload.single('images'),async (req,res)=>{
    try{
        console.log("inside customer edit router",req.body,req.file);
        if(req.file !== undefined)
        {
            req.body.images=req.file.originalname;
        }
        const userdata=await customerapi.changedata({_id:req.body.id},req.body)
        res.status(200).send("Changed Successfully");
    }
    catch(err){
        console.log("error in customer edit router",err)
        res.status(404).send(err);
    }
}),
module.exports=app;