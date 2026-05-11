import React from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";

export const PopularPosts = ({ post, index }) => {
  if (!post) return null;

  return (
    <Link
      to={`/${post._id}`}
      className="group flex gap-3 border-b border-zinc-200 py-4 last:border-b-0"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-500 transition group-hover:bg-emerald-50 group-hover:text-emerald-700">
        {index + 1}
      </span>
      <span className="min-w-0">
        <span className="line-clamp-2 text-sm font-medium leading-5 text-zinc-900 group-hover:text-emerald-700">
          {post.title}
        </span>
        <span className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
          <AiFillEye />
          {post.views || 0}
        </span>
      </span>
    </Link>
  );
};
