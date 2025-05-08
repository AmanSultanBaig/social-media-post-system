const postService = require("../services/postService");
const { successResponse, errorResponse } = require("../utils/response");

const createPost = async (req, res) => {
  try {
    const { content, platform } = req.body;
    const { id: userId } = req.user;

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
    const { platform, page = 1, limit = 10 } = req.query;
    const { id: userId } = req.user;

    const postQuery = {
      userId,
      platform,
    };

    const pagination = {
      page,
      limit,
    };

    const posts = await postService.getAllPosts(postQuery, pagination);
    return successResponse(res, "Fetched all posts", 200, posts);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
