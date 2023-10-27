const express=require("express");
const connection = require("./db");
const { userRouter } = require("./routes/user.routes");
const { notesRouter } = require("./routes/notes.routes");
const app = express();
const cors=require("cors");

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/notes",notesRouter);

app.listen(8080,async()=>{
    try{
    await connection;
        console.log('server is running on port 8080');
    }
    catch(err){
       console.log("error");
    }
})