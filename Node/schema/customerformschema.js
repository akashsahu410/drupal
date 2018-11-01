const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:{type:String},
    username:{type:String},
    email:{type:String},
    phone:{type:String},
    service:{type:String},
    address:{type:String},
    images:{type:String},
});

module.exports=mongoose.model("customerform_collections",userSchema);