import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <Image
            width={96}
            height={96}
            alt="Instagram logo"
            src={"/Instagram_logo_black.webp"}
          />
        </Link>

        <Link href="/" className="lg:hidden">
          <Image
            width={96}
            height={96}
            alt="Instagram logo"
            src={"/Instagram_logo_2016.webp"}
          />
        </Link>

        {/* search input */}
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />

        {/* for main section */}
        <button className="text-sm font-semibold text-blue-500">Log In</button>
      </div>
    </div>
  );
}
