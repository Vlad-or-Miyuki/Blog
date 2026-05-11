import React from "react";

export const CommentItem = ({ cmt }) => {
  const commentText = cmt?.comment || "";

  if (!commentText.trim()) return null;

  const avatar = commentText.trim().toUpperCase().slice(0, 2);

  return (
    <div className="flex gap-3 rounded-md border border-zinc-200 bg-white p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-xs font-semibold text-emerald-700">
        {avatar}
      </div>
      <p className="text-sm leading-6 text-zinc-700">{commentText}</p>
    </div>
  );
};
