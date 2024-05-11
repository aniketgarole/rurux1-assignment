const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    studentId: {type: String},
    streamId: {type: String},
    subjectId: {type: String},
    marks: {type: Number}
    
},{
    versionKey: false
})


const studentModel = mongoose.model("student", studentSchema)


module.exports = {studentModel}