const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors");
const { rootRouter } = require("./src/routers/root.routes");
require("dotenv").config();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
// Routes
rootRouter(app)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

