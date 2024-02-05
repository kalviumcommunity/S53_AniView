const express = require("express")
const mongoose = require("mongoose")
const Post = require("./models/post")
const app = express()
const port = 6969
app.use(express.json())
require("dotenv").config()

async function main() {
    await mongoose.connect(
      process.env.MONGO_LINK
    );
  }

  main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => console.log(err));


  app.get('/',async(req,res)=>{
    await Post.find().then((data)=>{
        res.send(data)
    })
})

app.post('/',async(req,res)=>{
    let newPost = new Post(req.body)
    newPost.save().then(()=>{res.send("data added successfuly")}).catch((err)=>res.send(err))
})

app.delete('/',async(req,res)=>{
    try {
        let toDelete = req.body.title
        let Del = await Post.deleteOne({title:toDelete})
        if(Del.deletedCount==0){
            res.send("Title not found")
        }else{
            res.send("Deleted successfully")
        }
    } catch (error) {
        res.status(500).send("Serover error")
    }
})

app.put("/:title",async(req,res)=>{
    const {title}= req.params
    const newData = req.body.title
    try {
        const updatedTitle = await Post.findOneAndUpdate({title:title},{title:newData})
        if(updatedTitle){
            res.send("Updated title")
        }else{
            res.status(500).send("some error occured")
        }
    } catch (error) {
        console.log("error updating data")
        res.status(500)
    }
})



app.listen(port,()=>{
    console.log("App listen at 6969")
})
