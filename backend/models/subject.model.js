const mongoose = require("mongoose")

const subjectSchema = mongoose.Schema({
    name: {type: String, required: true},
    streamId: {type: String}
    
},{
    versionKey: false
})


const subjectModel = mongoose.model("student", subjectSchema)


module.exports = {subjectModel}