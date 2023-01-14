
const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel}= require("../model/User.model")
require("dotenv").config();





const userRouter=express.Router();





userRouter.post("/register", async (req, res) => {
    const { name, email, pass, age } = req.body;
   
    

    try {
        let user_check=await UserModel.find({email})
        if(user_check.length===0){
        bcrypt.hash(pass, 4, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                console.log(err)
                res.send("Err")
            } else {
                let user = new UserModel({ name, email, pass: hash, age });
                await user.save();
                res.send({msg:"Registered"});
                console.log(user);
            }
        });
    }else{
        res.send({msg:"This email is already registered"})
    }
    }
    catch (err) {
        res.send("Registration Failed!");
        console.log(err);
    }
});


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {

        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, async (err, result) => {
                // result == false
                if (result) {
                    const token = jwt.sign({userID:user[0]._id}, process.env.secret_key, { expiresIn: "1h" });
                    res.send({ msg: "Login Successful", token });
                    //AR is secret key short orm of ali-rahul --secret key - depends on you andwrite in .env file key , port , url 
                    //payload
                    //algorithm - .sign

                }
                else {
                    res.send("Wrong credential!");
                }
            });
        } else {
            res.send("Wrong credential!");
        }
    } catch (err) {
        res.send("Something went wrong!");
        console.log(err);
    }
});


userRouter.get("/data", async (req, res) => {

    try {
        let user = await UserModel.find();


        res.send(user);
        console.log("data is there");
    }
    catch (err) {
        res.send("Something went wrong!");
        console.log(err);
    }
});


module.exports={
    userRouter
}
