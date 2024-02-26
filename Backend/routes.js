const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const { postValidation } = require("./utils/postValidation");
const User = require("./models/User");
const WrapAsync = require("./utils/wrapAsync");
const app = express();
const router = express.Router();
const UserRouter = express.Router();
var jwt = require("jsonwebtoken");
router.use(express.json());
UserRouter.use(express.json());
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.MONGO_LINK);
}

main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => console.log(err));

const validatePost = (req, res, next) => {
  let { error } = postValidation.validate(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    next();
  }
};

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
router.get("/posts/:username", async (req, res) => {
  let {username}=req.params
  await Post.find({username:username  }).then((data) => {
    res.send(data);
  });
});
UserRouter.get("/", async (req, res) => {
  let resData;
  await User.find().then((data) => {
    resData = data;
  });
  res.send(resData);
});
UserRouter.post(
  "/",
  WrapAsync(async (req, res) => {
    console.log(req.body);
    let postData = new User(req.body);
    await postData.save();
    let token = jwt.sign({ username: req.body.username }, process.env.JWT_PASS);
    res.send(token);
  })
);
UserRouter.post(
  "/signin",
  WrapAsync(async (req, res) => {
    let { username, password } = req.body;
    let result = await User.find({ username: username });
    if (result.length == 0) {
      res.status(404).send("User not found..!");
    } else {
      let savedPassword = result[0].password;
      if (savedPassword != password) {
        res.status(401).send("Wrong Password");
      } else {
        let token = jwt.sign(
          { username: req.body.username },
          process.env.JWT_PASS
        );
        res.send(token);
      }
    }
  })
);
UserRouter.put("/:username", async (req, res) => {
  try {
    let { username } = req.params;
    let newData = req.body;

    let result = await User.findOneAndUpdate({ username: username }, newData);

    if (result === null || result === undefined) {
      res.status(404).send("User not found");
    } else {
      res.send("UPDATED");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.post("/", validatePost, async (req, res) => {
  let newPost = new Post(req.body);
  newPost
    .save()
    .then(() => {
      res.send("data added successfuly");
    })
    .catch((err) => res.send(err));
});
UserRouter.delete(
  "/",
  WrapAsync(async (req, res) => {
    let deleteUser = req.body.userName;
    // console.log(deleteUser)
    let result = await User.deleteOne({ userName: deleteUser });
    // console.log(result)
    if (result.deletedCount == 0) {
      res.status(404).send("User not found..!");
    }
    res.send("Deleted");
  })
);
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

router.put("/:id", validatePost, async (req, res) => {
  try {
    const { id } = req.params; // Extracting the ID from request parameters
    const newData = req.body; // Getting the updated data from the request body
    const updatedPost = await Post.findByIdAndUpdate(id, newData);
    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }
    res.send("Updated!"); // Sending a success response
  } catch (error) {
    console.error(error); // Logging the error for debugging
    res.status(505).send("Server error"); // Sending a server error response
  }
});

module.exports = { router, UserRouter };

// .listen(port,()=>{
//     console.log("App listen at 6969")
// })
