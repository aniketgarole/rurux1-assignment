const mongoose = require("mongoose")

const streamSchema = mongoose.Schema({
    name: {type: String, required: true},
    
    
},{
    versionKey: false
})


const streamModel = mongoose.model("student", streamSchema)


module.exports = {streamModel}