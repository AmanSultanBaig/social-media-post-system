const Post = require("../models/Post");

createPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};

getAllPosts = async () => {
  return await Post.find()
    .populate("user_id", "name")
    .sort({ posted_at: -1 });
};

module.exports = {
    createPost,
    getAllPosts
}