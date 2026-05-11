import React from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="mx-auto w-full max-w-screen-xl px-4 py-8 md:py-10">
        {children}
      </main>
    </React.Fragment>
  );
};
