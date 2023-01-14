const jwt =require('jsonwebtoken')
require("dotenv").config();

//previous validator 

// const validator =(req,res,next)=>{
//     const token =req.headers.authorization;
//     if(token){
//         const decoded=jwt.verify(token,'masai')
//         if(decoded){
//             next()
//         }else{
//             res.send({"msg":"please login first"})
//         }
//     }else{
//         res.send("please login first")
//     }
// }

//new validator which will update the pbject with userid

const validator =(req,res,next)=>{

    const token =req.headers.authorization;

    if(token){

        const decoded=jwt.verify(token,process.env.secret_key)
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }else{
            res.send({"msg":"please login first"})
        }
    }else{
        res.send("please login first")
    }
}

module.exports={validator}