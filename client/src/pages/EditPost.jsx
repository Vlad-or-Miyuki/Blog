import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineFileImage, AiOutlineSave } from "react-icons/ai";
import axios, { getImageUrl } from "../utils/axios";
import { updatePost } from "../store/features/post/postSlice";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title || "");
    setText(data.text || "");
    setOldImage(data.imgUrl || "");
  }, [params.id]);

  const submitHandler = () => {
    if (!title.trim() || !text.trim()) return;

    const updatedPost = new FormData();
    updatedPost.append("title", title.trim());
    updatedPost.append("text", text.trim());
    updatedPost.append("id", params.id);
    if (newImage) updatedPost.append("image", newImage);

    dispatch(updatePost(updatedPost));
    navigate("/posts");
  };

  const clearFormHandler = () => {
    setTitle("");
    setText("");
    setNewImage(null);
    setOldImage("");
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const previewSrc = newImage
    ? URL.createObjectURL(newImage)
    : oldImage
    ? getImageUrl(oldImage)
    : "";

  return (
    <form
      className="mx-auto max-w-3xl space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="border-b border-zinc-200 pb-6">
        <Link to={`/${params.id}`} className="text-sm font-medium text-emerald-700">
          Вернуться к посту
        </Link>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
          Редактирование
        </h1>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Обложка</span>
        <span className="mt-2 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-300 bg-white p-4 text-center transition hover:border-emerald-500">
          {previewSrc ? (
            <img
              src={previewSrc}
              alt="Обложка поста"
              className="max-h-80 w-full object-contain"
            />
          ) : (
            <>
              <AiOutlineFileImage className="text-3xl text-zinc-400" />
              <span className="mt-2 text-sm text-zinc-500">
                Выберите изображение для поста
              </span>
            </>
          )}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            setNewImage(e.target.files?.[0] || null);
            setOldImage("");
          }}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Заголовок</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className="mt-2 min-h-12 w-full rounded-md border border-zinc-300 bg-white px-4 text-base text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Текст</span>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Текст поста"
          className="mt-2 min-h-56 w-full resize-none rounded-md border border-zinc-300 bg-white px-4 py-3 text-base leading-7 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          onClick={submitHandler}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <AiOutlineSave />
          Сохранить
        </button>

        <button
          type="button"
          onClick={clearFormHandler}
          className="inline-flex min-h-11 items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-900"
        >
          Очистить
        </button>
      </div>
    </form>
  );
};
