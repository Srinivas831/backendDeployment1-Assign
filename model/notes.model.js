const mongoose=require("mongoose");

const notesSchema=mongoose.Schema({
    title:String,
    body:String,
    username:String,
    userId:String
},{
    versionKey:false
})

const NotesModel=mongoose.model("notes",notesSchema);
module.exports={NotesModel};