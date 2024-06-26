import React from "react";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";

export default function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
      {" "}
      <section className="md:col-span-3 lg:col-span-2">
        {/* left one for posts */}
        <Posts />
      </section>
      {/* right one for mini profile */}
      <section className="hidden md:hidden lg:inline-grid lg:col-span-1">
        <div className="fixed w-[380px]">
          {" "}
          <MiniProfile />
        </div>
      </section>
    </main>
  );
}
