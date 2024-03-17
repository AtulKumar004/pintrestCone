const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
  postText: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type : Array,
    default: []

  },
});

const Post = mongoose.model("Post" , postSchema);
module.exports=Post;
