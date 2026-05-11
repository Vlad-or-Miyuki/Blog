import React from "react";
import { NavLink } from "react-router-dom";

export default function MyButton({ children, className = "", to, type, ...props }) {
  const classes = `inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${className}`;

  if (to) {
    return (
      <NavLink to={to} className={classes} {...props}>
        {children}
      </NavLink>
    );
  }

  return (
    <button type={type || "button"} className={classes} {...props}>
      {children}
    </button>
  );
}
