const express = require("express")
const { connection } = require("./connect")

const app = express()

// app.use(express.json())

app.use(express.json())
app.use(cors())







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