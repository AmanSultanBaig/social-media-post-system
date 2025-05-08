const Post = require("../models/Post");

createPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};

getAllPosts = async (filter, pagination) => {
  const { userId, platform } = filter;
  const { page, limit } = pagination;

  let queryFilter = { user_id: userId };

  const skip = (page - 1) * limit;

  if (platform) {
    queryFilter = { ...queryFilter, platform: platform.toLowerCase() };
  }

  const posts = await Post.find(queryFilter)
    .populate("user_id", "name")
    .sort({ posted_at: -1 })
    .skip(skip)
    .limit(limit);

  const totalPosts = await Post.countDocuments(queryFilter);

  return {
    posts,
    pagination: {
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      pageSize: limit,
    },
  };
};

module.exports = {
  createPost,
  getAllPosts,
};
