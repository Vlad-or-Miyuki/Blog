import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  AiFillEye,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import Moment from "react-moment";
import { Spinner } from "./Spinner";
import { getImageUrl } from "../utils/axios";
import { likePost } from "../store/features/post/postSlice";

const hasUserLike = (likes = [], userId) =>
  Boolean(userId) &&
  likes.some((like) => {
    const likeId = typeof like === "object" ? like?._id : like;
    return likeId?.toString() === userId;
  });

export const PostItem = ({ post, onPostUpdate }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  if (!currentPost) {
    return (
      <div className="py-10 text-center text-xl text-zinc-900">
        <Spinner />
      </div>
    );
  }

  const liked = hasUserLike(currentPost.likes, user?._id);
  const likesCount = currentPost.likes?.length || 0;

  const handleLike = async () => {
    if (!token) {
      toast("Войдите, чтобы лайкать посты");
      return;
    }

    try {
      const updatedPost = await dispatch(likePost(currentPost._id)).unwrap();
      setCurrentPost(updatedPost);
      onPostUpdate?.(updatedPost);
    } catch (error) {
      toast("Не удалось обновить лайк");
    }
  };

  return (
    <article className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/${currentPost._id}`} className="block">
        <div className="flex h-64 items-center justify-center overflow-hidden bg-zinc-100">
          {currentPost.imgUrl ? (
            <img
              src={getImageUrl(currentPost.imgUrl)}
              alt={currentPost.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-900 px-6 text-center text-lg font-semibold text-white">
              {currentPost.title}
            </div>
          )}
        </div>

        <div className="space-y-4 p-5 pb-4">
          <div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
            <span>{currentPost.username || "Автор"}</span>
            <Moment date={currentPost.createdAt} format="D MMM YYYY" />
          </div>

          <h2 className="line-clamp-2 text-xl font-semibold leading-7 tracking-tight text-zinc-900">
            {currentPost.title}
          </h2>

          <p className="line-clamp-3 text-sm leading-6 text-zinc-600">
            {currentPost.text}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-4 border-t border-zinc-100 px-5 py-4 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1">
          <AiFillEye />
          {currentPost.views || 0}
        </span>
        <span className="inline-flex items-center gap-1">
          <AiOutlineMessage />
          {currentPost.comments?.length || 0}
        </span>
        <button
          type="button"
          onClick={handleLike}
          className={`ml-auto inline-flex min-h-9 items-center gap-1 rounded-md border px-3 py-1 text-sm font-medium transition ${
            liked
              ? "border-red-100 bg-red-50 text-red-600 hover:border-red-200"
              : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-900"
          }`}
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          {likesCount}
        </button>
      </div>
    </article>
  );
};
