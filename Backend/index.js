const express = require("express");
const { connection } = require("./config/db");
const {userRouter}= require("./routes/userRouter.route")
const {notesRouter} = require("./routes/notes.router")
const {validator} = require("./middlewares/validator.middleware")
const cors=require("cors")
require("dotenv").config();



const app = express();
app.use(express.json());
app.use(cors())

app.use("/users",userRouter)
app.use(validator)
app.use("/notes",notesRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to the Database");
    }
    catch (err) {
        console.log(err);
        console.log("Connection Failed!");
    }
    console.log(`Running at port ${process.env.port}`);
});