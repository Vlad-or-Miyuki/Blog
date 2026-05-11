import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id || req.body.postId;
    const commentText = req.body.comment?.trim();

    if (!commentText) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post was not found' });
    }

    const newComment = new Comment({
      comment: commentText,
      author: req.userId,
    });
    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    return res.json(newComment);
  } catch (e) {
    return res.status(500).json({
      message: 'Failed to create comment',
    });
  }
};
