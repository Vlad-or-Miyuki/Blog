import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineRead } from "react-icons/ai";
import { getAllPosts } from "../store/features/post/postSlice";
import { PostItem } from "../components/PostItem";
import { PopularPosts } from "../components/PopularPosts";
import { Spinner } from "../components/Spinner";

export const Main = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts, loading } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading && !posts.length) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 border-b border-zinc-200 pb-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
            Открытая лента
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl">
            Блог для заметок, историй и идей
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Пишите о проектах, книгах, учебе, жизни или чем угодно еще. Главная
            страница теперь показывает публикации сразу, без привязки к одной теме.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {token && (
            <Link
              to="/new"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              <AiOutlinePlus />
              Новый пост
            </Link>
          )}
          <a
            href="#feed"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-900"
          >
            <AiOutlineRead />
            Читать
          </a>
        </div>
      </section>

      {!posts.length ? (
        <section className="rounded-md border border-dashed border-zinc-300 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-zinc-900">
            Постов пока нет
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Создайте первую публикацию, и она появится в общей ленте.
          </p>
          {token && (
            <Link
              to="/new"
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Добавить пост
            </Link>
          )}
        </section>
      ) : (
        <section id="feed" className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                  Последние публикации
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {posts.length} материалов в ленте
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">Популярное</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Посты, которые чаще открывали
            </p>

            <div className="mt-3">
              {popularPosts?.length ? (
                popularPosts.map((post, index) => (
                  <PopularPosts key={post._id} post={post} index={index} />
                ))
              ) : (
                <p className="py-4 text-sm text-zinc-500">
                  Популярных постов пока нет.
                </p>
              )}
            </div>
          </aside>
        </section>
      )}
    </div>
  );
};
