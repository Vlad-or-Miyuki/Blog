import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "../utils/axios";
import { PostItem } from "../components/PostItem";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (error) {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handlePostUpdate = (updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
            Кабинет автора
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
            Мои посты
          </h1>
        </div>
        <Link
          to="/new"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <AiOutlinePlus />
          Новый пост
        </Link>
      </div>

      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostItem
              post={post}
              key={post._id}
              onPostUpdate={handlePostUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-zinc-300 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-zinc-900">
            У вас пока нет постов
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Начните с короткой заметки или полноценной статьи.
          </p>
        </div>
      )}
    </div>
  );
};
