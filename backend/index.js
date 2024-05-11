const express = require("express")
const cors = require("cors")
const { connection } = require("./connect")
const studentRoutes = require('./routes/student.routes.js');
const streamRoutes = require('./routes/stream.routes.js');
const subjectRoutes = require('./routes/subject.routes.js');
const markRoutes = require('./routes/marks.routes.js');
const app = express()


app.use(express.json())
app.use(cors())


app.use('/students', studentRoutes);
app.use('/streams', streamRoutes);
app.use('/subjects', subjectRoutes);
app.use('/marks', markRoutes);




app.listen(8080, async()=> {
    console.log("Server has started on port 8080")
    try {
        await connection
        console.log("Server is connected to Database")
    } catch (error) {
        console.log("Server could not connect to Database")
        console.log(error)
    }
})