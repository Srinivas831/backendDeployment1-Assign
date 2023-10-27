const express=require("express");
const bcrypt=require("bcrypt");
const { UserModel } = require("../model/user.model");
const userRouter=express.Router();
const jwt=require("jsonwebtoken");

userRouter.post("/register",async(req,res)=>{
    const obj=req.body;
    try{
        const find=await UserModel.findOne({email:obj.email});
        if(find){
        return res.status(400).send({message:"Email already exists"})
        }
            bcrypt.hash(obj.password,2,async(err,hash)=>{
                if(hash){
                    const hashed=new UserModel({...obj,password:hash});
                    await hashed.save();
                    res.status(200).send({"msg":"registered successfully","password":hashed});
                }
                else{
                    res.status(400).send("error in hashing");
                } 
            })
    }
    catch(err){
        res.status(400).send(err);
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        const find=await UserModel.findOne({email:req.body.email});
        if(!find){
            return res.status(400).send({message:"email is not registered"});
        }
        // console.log(find);
        const token=jwt.sign({username:find.username,userId:find._id},"secret");
        bcrypt.compare(req.body.password,find.password,(err,result)=>{
            if(result){
                console.log(result);
                res.status(200).send({"msg":"logged successfully",token:token});
            }else{
                res.status(400).send("wrong password");
            }
        })
    }
    catch(err){                                         
        res.status(400).send(err);
    }
})

module.exports={userRouter};
