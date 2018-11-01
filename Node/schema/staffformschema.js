const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    designation:{type:String},
    address:{type:String},
    joiningdate:{type:String},
    images:{type:String},
});

module.exports=mongoose.model("staffform_collections",userSchema);