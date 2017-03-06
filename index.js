const express = require("express")

const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const router = require("./router")

mongoose.connect("mongodb://info:zxc123@ds113630.mlab.com:13630/react")


app.use(bodyParser.json({type: '*/*'}))

router(app)



// server listening
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server INTIAL')
})