import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillDelete,
  AiFillEye,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSend,
  AiTwotoneEdit,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { getImageUrl } from "../utils/axios";
import {
  createComment,
  getPostComments,
} from "../store/features/comment/commentSlice";
import { CommentItem } from "../components/CommentItem";
import { Spinner } from "../components/Spinner";
import { likePost, removePost } from "../store/features/post/postSlice";

const hasUserLike = (likes = [], userId) =>
  Boolean(userId) &&
  likes.some((like) => {
    const likeId = typeof like === "object" ? like?._id : like;
    return likeId?.toString() === userId;
  });

export const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const removePostHandler = () => {
    dispatch(removePost(params.id));
    toast("Пост удален");
    navigate("/posts");
  };

  const handleSubmit = () => {
    if (!comment.trim()) return;

    dispatch(createComment({ postId: params.id, comment: comment.trim() }));
    setComment("");
  };

  const handleLike = async () => {
    if (!token) {
      toast("Войдите, чтобы лайкать посты");
      return;
    }

    try {
      const updatedPost = await dispatch(likePost(params.id)).unwrap();
      setPost(updatedPost);
    } catch (error) {
      toast("Не удалось обновить лайк");
    }
  };

  const fetchComments = useCallback(async () => {
    dispatch(getPostComments(params.id));
  }, [params.id, dispatch]);

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const liked = hasUserLike(post.likes, user?._id);
  const likesCount = post.likes?.length || 0;

  return (
    <article className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="min-w-0 space-y-6">
        <Link to="/" className="text-sm font-medium text-emerald-700">
          Назад к ленте
        </Link>

        <header className="space-y-4 border-b border-zinc-200 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <span>{post.username || "Автор"}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <Moment date={post.createdAt} format="D MMM YYYY" />
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-1">
                <AiFillEye />
                {post.views || 0}
              </span>
              <span className="inline-flex items-center gap-1">
                <AiOutlineMessage />
                {comments?.length || post.comments?.length || 0}
              </span>
              <button
                type="button"
                onClick={handleLike}
                className={`inline-flex min-h-9 items-center gap-1 rounded-md border px-3 py-1 text-sm font-medium transition ${
                  liked
                    ? "border-red-100 bg-red-50 text-red-600 hover:border-red-200"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-900"
                }`}
              >
                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                {likesCount}
              </button>
            </div>

            {user?._id === post.author && (
              <div className="flex gap-2">
                <Link
                  to={`/${params.id}/edit`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-900"
                >
                  <AiTwotoneEdit />
                  Изменить
                </Link>
                <button
                  type="button"
                  onClick={removePostHandler}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:border-red-600"
                >
                  <AiFillDelete />
                  Удалить
                </button>
              </div>
            )}
          </div>
        </header>

        {post.imgUrl && (
          <div className="flex max-h-[620px] items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
            <img
              src={getImageUrl(post.imgUrl)}
              alt={post.title}
              className="max-h-[620px] w-full object-contain"
            />
          </div>
        )}

        <div className="whitespace-pre-wrap text-base leading-8 text-zinc-700">
          {post.text}
        </div>
      </div>

      <aside className="h-fit rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Комментарии</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Обсуждение к этой публикации
        </p>

        <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваш комментарий"
            className="min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
            aria-label="Отправить комментарий"
          >
            <AiOutlineSend />
          </button>
        </form>

        <div className="mt-5 space-y-3">
          {comments?.length ? (
            comments.map((cmt, index) => (
              <CommentItem
                key={cmt?._id || `${cmt?.comment}-${index}`}
                cmt={cmt}
              />
            ))
          ) : (
            <p className="rounded-md bg-zinc-50 p-4 text-sm text-zinc-500">
              Комментариев пока нет.
            </p>
          )}
        </div>
      </aside>
    </article>
  );
};
