const mongoose=require("mongoose");
require("dotenv").config();
const connection=mongoose.connect("mongodb+srv://srinivasan:srinivashari@cluster0.gmtgxdz.mongodb.net/notesBackend?retryWrites=true&w=majority");

module.exports=connection;