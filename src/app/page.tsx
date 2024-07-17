"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlaylistSearch from "~/components/PlaylistSearch";
import { getCurrentToken } from "~/utils/spotifyToken";

const HomePage = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    console.log("access_token", localStorage.getItem("access_token"));

    const currentToken = getCurrentToken();
    console.log("current token", currentToken);
    if (currentToken.access_token) {
      setToken(currentToken.access_token);
    }
  }, []);

  if (!token) {
    return (
      <div>
        <button
          className="rounded-lg bg-[#0b0b16] px-8 py-4 text-2xl"
          onClick={() => router.push(`http://localhost:3000/login`)}
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
      <PlaylistSearch />
    </>
  );
};

export default HomePage;
