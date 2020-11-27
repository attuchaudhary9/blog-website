//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent =
  "The rewarding field of web development comes with many perks, but it’s one of those jobs that require habitual learning and self-improvement. With the sheer amount of programming languages in use, staying ahead in your career can be tough. It’s also a field that’s constantly changing. Whether the industry calls for new standards or an important development tool gets an update, you need to be aware of the changes. In this post, we’ve rounded up a list of 100 of the best web development blogs to bookmark in your browser. Our list includes web development blogs brimming with coding tutorials and examples that are suitable for front-end, back-end and full-stack developers. We’ve also included some that deal with general themes in the industry, as well as how to tackle the difficulties that developers face everyday. Read on, you will! ";
const aboutContent =
  "I'm also a full-stack developer and general doodler with a keen eye for creating engaging UI, bringing prodducts to life. I've spent the past 6+ month working across full-stack development. These days my time is spent researching, designing and coding.";
const contactContent =
  "Have an exciting project where you need some help? Send me over a message,";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
