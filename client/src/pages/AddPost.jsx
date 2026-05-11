import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineFileImage, AiOutlineSend } from "react-icons/ai";
import { createPost } from "../store/features/post/postSlice";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    if (!title.trim() || !text.trim()) return;

    const data = new FormData();
    data.append("title", title.trim());
    data.append("text", text.trim());
    if (image) data.append("image", image);

    dispatch(createPost(data));
    navigate("/");
  };

  const clearFormHandler = () => {
    setText("");
    setTitle("");
    setImage(null);
  };

  return (
    <form
      className="mx-auto max-w-3xl space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="border-b border-zinc-200 pb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
          Новая публикация
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
          Напишите пост
        </h1>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Обложка</span>
        <span className="mt-2 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-300 bg-white p-4 text-center transition hover:border-emerald-500">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
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
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Заголовок</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например: чему я научился за неделю"
          className="mt-2 min-h-12 w-full rounded-md border border-zinc-300 bg-white px-4 text-base text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Текст</span>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Расскажите историю, поделитесь мыслью или сохраните заметку."
          className="mt-2 min-h-56 w-full resize-none rounded-md border border-zinc-300 bg-white px-4 py-3 text-base leading-7 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          onClick={submitHandler}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <AiOutlineSend />
          Опубликовать
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
