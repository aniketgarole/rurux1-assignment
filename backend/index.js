const express = require("express")
const { connection } = require("./connect")
const studentRoutes = require('./routes/studentRoutes');
const streamRoutes = require('./routes/streamRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const markRoutes = require('./routes/markRoutes');
const app = express()

// app.use(express.json())

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