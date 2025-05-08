const postService = require("../services/postService");
const { successResponse, errorResponse } = require("../utils/response");

const createPost = async (req, res) => {
  try {
    const { content, platform } = req.body;
    const { id: userId } = req.user;

    console.log()
    const postData = {
      user_id: userId,
      content,
      platform,
    };

    const post = await postService.createPost(postData);
    return successResponse(res, "Post created successfully", 201, post);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return successResponse(res, "Fetched all posts", 200, posts);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
