const userdb=require('../schema/customerformschema')
module.exports={
    //to save the data of customer
    savedata(data){
        return new Promise((resolve,reject)=>{
            console.log("inside the api",data)
            userdb.create(data,(err,result)=>{
                if(err)
                {
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        });
    },
    //to check existance of customer
    finddata(data){
        return new Promise((resolve,reject)=>{
            console.log("inside the api",data)
            userdb.find(data,(err,result)=>{
                if(err)
                {
                    console.log("error in api main",err)
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        });
    },

    //to check search of customers
    findsearchdata(data){
        return new Promise((resolve,reject)=>{
            console.log("inside the api",data)
            userdb.find({name:{$regex:data.name,$options:"i"}},(err,result)=>{
                if(err)
                {
                    console.log("error in api main",err)
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        });
    },
    //to delete the customer data
    deletedata(data){
        return new Promise((resolve,reject)=>{
            console.log("inside the api",data)
            userdb.remove(data,(err,result)=>{
                if(err)
                {
                    console.log("error in api main",err)
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        });
    },
    //to change the data of customer
    changedata(key,data){
        return new Promise((resolve,reject)=>{
            console.log("inside the api",data)
            userdb.update(key,{$set:data},(err,result)=>{
                if(err)
                {
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        });
    },
}