const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const app = express();
const router = express.Router();
router.use(express.json());
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.MONGO_LINK);
}

main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => console.log(err));

router.get("/", async (req, res) => {
  await Post.find().then((data) => {
    res.send(data);
  });
});
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let result = await Post.findById(id);
    if (result == null) {
      res.status(404).send("Post not found..!");
    }
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(505).send(error);
  }
});
router.post("/", async (req, res) => {
  let newPost = new Post(req.body);
  newPost
    .save()
    .then(() => {
      res.send("data added successfuly");
    })
    .catch((err) => res.send(err));
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let result = await Post.findByIdAndDelete(id);
    if (result.deletedCount == 0) {
      res.status(404).send("Post not found..!");
    }
    res.send("Deleted");
  } catch (error) {
    res.status(500).send("Serover error");
  }
});

router.put("/:id ", async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    let result = await Post.findByIdAndUpdate(id, newData);

    if (result === null || result === undefined) {
      res.status(404).send("Post not found..!");
    } else {
      res.send("UPDATED");
    }
  } catch (error) {
    res.status(505).send("Server error");
  }
});

module.exports = router;

// .listen(port,()=>{
//     console.log("App listen at 6969")
// })
