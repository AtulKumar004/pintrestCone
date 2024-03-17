var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async function (req, res, next) {
  let newUser = await userModel.create({
    username: "Atul kumar",
    email: "atul@gmail.com",
    posts: [],
    phoneNo: 1122334477,
    password: "Qwerty@123",
  });

  res.send(newUser);
});

router.get("/alluserposts", async function (req, res, next) {
  let user = await userModel.findOne({_id: "65f6d09b695fcdfce8c5a035"}).populate('posts').select('-password');
  res.send(user);
});
router.get("/allposts", async function (req, res, next) {
  let user = await postModel.findOne({userId: "65f6d09b695fcdfce8c5a035"}).populate('userId').select('-password');
  res.send(user);
});
router.get("/createpost", async function (req, res, next) {
  let newPost = await postModel.create({
    postText: "How are you",
    userId: '65f6d09b695fcdfce8c5a035'
  });
  let user = await userModel.findOne({_id: "65f6d09b695fcdfce8c5a035"}).select('-password');
  user.posts.push(newPost._id);
  await user.save();
  // res.send(user);

  res.send(newPost);
});

module.exports = router;
