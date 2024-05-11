const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    streamId: {type: string}
    
},{
    versionKey: false
})


const studentModel = mongoose.model("student", studentSchema)


module.exports = {studentModel}