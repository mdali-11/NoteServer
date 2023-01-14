const express=require('express')
const { notesModel } = require("../model/notes.model");
const notesRouter =express.Router();



notesRouter.get("/", async (req, res) => {

    try {
        let notes = await notesModel.find();
        res.send(notes);
        // console.log(notes);
    }
    catch (err) {
        res.send("Something went wrong!");
        console.log(err);
    }
});

notesRouter.post("/create",async(req,res)=>{
    const payload =req.body;
    try{
       const notes =new notesModel(payload)
       await notes.save()
       res.send("Created the note")
    }catch(err){
     console.log(err)
     res.send({"msg":"soething went wrong"})
    }
})


notesRouter.patch("/update/:id", async(req,res)=>{

    const payload=req.body;
    const id=req.params.id;
    const note=await notesModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_request=req.body.userID;

    try{
        if(userID_making_request!==userID_in_note){
            res.send("You are not authorized")
        }else{
            await notesModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the note")
        }

    }catch(err){
        console.log(err)
        res.send({"msg":"soething went wrong"})
    }
})

notesRouter.delete("/delete/:id", async(req,res) => {

    const id=req.params.id;
    const note=await notesModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_request=req.body.userID;

    try{
        if(userID_making_request!==userID_in_note){
            res.send("You are not authorized")
        }else{
            await notesModel.findByIdAndDelete({"_id":id})
            res.send("Deleted the note")
        }

    }catch(err){
        console.log(err)
        res.send({"msg":"soething went wrong"})
    }

})

module.exports={notesRouter}