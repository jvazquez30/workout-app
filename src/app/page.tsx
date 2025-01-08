import React from "react";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <div className="">
      <LoginPage />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
