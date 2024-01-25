const express = require("express")
const app = express()
const port = 6969

app.get('/ping',(req,res)=>{
    res.send("pong")
})

app.get('/',(req,res)=>{
    res.send("root path")
})

app.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})