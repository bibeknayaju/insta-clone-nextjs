"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export default function Header() {
  const { data: session } = useSession();
  const [caption, setCaption] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imageFileUrl, setImageFileUrl] = React.useState(null);
  const filePickerRef = React.useRef(null);
  const [imageFileUploading, setImageFileUploading] = React.useState(false);
  function addImageToPost(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  async function uploadImageToStorage() {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, `posts/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.error(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  }
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
      {isOpen && (
        <Modal
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          isOpen={isOpen}
          ariaHideApp={false}
          onRequestClose={() => setIsOpen(false)}>
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile(null)}
                src={imageFileUrl}
                alt="selected file"
                className={`w-full max-h-[250px] object-contain cursor-pointer ${
                  imageFileUploading ? "animate-pulse" : ""
                }`}
              />
            ) : (
              <HiCamera
                onClick={() => filePickerRef.current.click()}
                className="text-5xl text-gray-400 cursor-pointer"
              />
            )}
            <input
              hidden
              ref={filePickerRef}
              type="file"
              accept="image/*"
              onChange={addImageToPost}
            />{" "}
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Please enter you caption..."
            className="m-4 border-none text-center w-full focus:ring-0 outline-none"
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
            Upload Post
          </button>
          <AiOutlineClose
            className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
