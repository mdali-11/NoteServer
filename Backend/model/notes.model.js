
const mongoose =require("mongoose")

const noteSchema =mongoose.Schema({
     title:String,
     note:String,
    category:String,
    author:String,
    userID:String
})

const notesModel =mongoose.model('notes',noteSchema)

module.exports ={notesModel}