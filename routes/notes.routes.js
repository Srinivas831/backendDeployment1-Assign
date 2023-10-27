const express=require("express");
const { NotesModel } = require("../model/notes.model");
const { auth } = require("../middlewares/auth.middleware");
const notesRouter=express.Router();

notesRouter.use(auth);
notesRouter.post("/add",async(req,res)=>{
    try{
        const added=new NotesModel(req.body);
        await added.save();
        res.status(200).send({msg:"added",posted:added});
    }
    catch(err){
        res.status(400).send({"msg":"error adding"});
    }
})

notesRouter.get("/get",async(req,res)=>{
    try{
        // console.log(req.body);
        const get=await NotesModel.find({userId:req.body.userId});
        res.status(200).send(get);
    }
    catch(err){
        res.status(400).send("error gettig");
    }
})

notesRouter.patch("/patch/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const find=await NotesModel.findOne({_id:id});
        // let patchedNote=await NotesModel.updateOne({_id:req.params.id},{$set:{title:req.body}})
        if(req.body.userId==find.userId){
            await NotesModel.findByIdAndUpdate({_id:id},req.body);
res.status(200).send({"msg":"patched successfully"});
        }else{
            res.status(400).send("login");
        }
    }
    catch(err){
        res.status(400).send("error patching");
    }
})

notesRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const find=await NotesModel.findOne({_id:id});
        if(req.body.userId==find.userId){
            await NotesModel.findByIdAndDelete({_id:id});
            res.status(200).send({"msg":"deleted successfully"});
        }
    }
    catch(err){
        res.status(400).send({"msg":"error deleting"});
    }
})

module.exports={notesRouter};