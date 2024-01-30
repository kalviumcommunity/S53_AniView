const mongoose = require('mongoose');
const Post = mongoose.model("Post",{
    title:{
        type: String,
        required : true
    },
    image:{
        type: String,
        required : true
    },
    likes:{
        type: Number,
    },
    comments:{
        type: Number,
    },
    category:{
        type: String,
        required: true
    }
})

module.exports = Post;