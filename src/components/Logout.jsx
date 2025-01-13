"use client";

import { deleteToken } from "@/mutation/serverActions";
import { logout } from "@/slices/loginSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Logout({ res }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res === 401) {
      deleteUser();
    }
  }, [res]);

  const deleteUser = () => {
    dispatch(logout());
    deleteToken();
    router.push("/");
  };
  return (
    <div
      className="p-5 bg-blue-400 cursor-pointer text-white"
      onClick={deleteUser}
    >
      Logout
    </div>
  );
}
