"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
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
        {session ? (
          <div className="flex gap-2 items-center">
            <IoMdAddCircleOutline
              className="text-2xl cursor-pointer tranform hover:scale-125 transition duration-300 hover:text-red-600"
              onClick={() => setIsOpen(true)}
            />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={signOut}
            />
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-sm font-semibold text-blue-500">
            Log In
          </button>
        )}
      </div>
    </div>
  );
}
