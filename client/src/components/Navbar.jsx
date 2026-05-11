import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { checkIsAuth, logout } from "../store/features/auth/authSlice";
import MyButton from "./UI/MyButton";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Вы вышли из системы");
  };

  const navClass = ({ isActive }) =>
    `inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-emerald-50 text-emerald-700"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-zinc-900 text-base font-semibold text-white">
            J
          </span>
          <span>
            <span className="block text-base font-semibold tracking-tight text-zinc-900">
              Journal
            </span>
            <span className="block text-xs text-zinc-500">
              блог о чем угодно
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={navClass}>
            <AiOutlineHome />
            Главная
          </NavLink>

          {isAuth && (
            <>
              <NavLink to="/posts" className={navClass}>
                <AiOutlineEdit />
                Мои посты
              </NavLink>
              <NavLink to="/new" className={navClass}>
                <AiOutlinePlus />
                Новый пост
              </NavLink>
            </>
          )}

          {isAuth ? (
            <MyButton onClick={logoutHandler} className="ml-0 md:ml-2">
              Выйти
            </MyButton>
          ) : (
            <MyButton to="/login" className="ml-0 md:ml-2">
              Войти
            </MyButton>
          )}
        </nav>
      </div>
    </header>
  );
};
