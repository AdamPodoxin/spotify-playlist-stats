"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlaylistSearch from "~/components/PlaylistSearch";
import { clearLocalStorage, getCurrentToken } from "~/utils/spotifyToken";

const HomePage = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = getCurrentToken();
    if (currentToken.access_token) {
      setToken(currentToken.access_token);
    }
  }, []);

  if (!token) {
    return (
      <div>
        <button
          className="rounded-lg bg-[#0b0b16] px-8 py-4 text-2xl"
          onClick={() =>
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
          }
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Spotify Playlist Stats
      </h1>
      <button
        className="rounded-lg bg-[#0b0b16] px-4 py-2 text-lg"
        onClick={() => {
          clearLocalStorage();
          location.reload();
        }}
      >
        Logout
      </button>
      <PlaylistSearch />
    </>
  );
};

export default HomePage;
