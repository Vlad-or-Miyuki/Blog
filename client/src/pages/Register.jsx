import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser, checkIsAuth } from "../store/features/auth/authSlice";

export const Register = () => {
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) return;

    dispatch(registerUser({ username: username.trim(), password }));
    setPassword("");
    setUsername("");
  };

  return (
    <div className="mx-auto max-w-md">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
          Регистрация
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
          Создайте аккаунт
        </h1>

        <label className="mt-6 block">
          <span className="text-sm font-medium text-zinc-700">
            Имя пользователя
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-zinc-700">Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Зарегистрироваться
        </button>

        <p className="mt-5 text-center text-sm text-zinc-500">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="font-medium text-emerald-700">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
