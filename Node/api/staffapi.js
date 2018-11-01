const userdb=require('../schema/staffformschema')
module.exports={
    //to save the data of staff
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
    //to check existance of staff 
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
    //to check search of staff
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
    //to delete the staff data
    deletedata(data){
        return new Promise((resolve,reject)=>{
            console.log("inside the api of customer",data)
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
    //to change the data of staff
    changedata(key,data){
        return new Promise((resolve,reject)=>{
            console.log("inside the api of change staff",data)
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