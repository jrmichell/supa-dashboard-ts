"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // Add the missing import statement for SupabaseUser
import { useRouter } from "next/navigation";
import { supabase } from "./utils/SupabaseClient";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();

  const handleLogOut: MouseEventHandler = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      } else {
        router.push("/signin");
      }
    };

    getProfile();
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-semibold text-white">
          Welcome, your email is {user.email}
        </h1>

        <button
          className="mt-6 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
