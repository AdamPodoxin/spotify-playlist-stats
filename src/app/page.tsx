"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlaylistSearch from "~/components/PlaylistSearch";
import UserPlaylists from "~/components/UserPlaylists";
import { env } from "~/env";
import { clearLocalStorage, getCurrentToken } from "~/utils/spotifyToken";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

const HomePage = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = getCurrentToken();
    if (currentToken.access_token) {
      setToken(currentToken.access_token);
    }
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      {!token && (
        <button
          className="rounded-lg bg-[#0b0b16] px-8 py-4 text-2xl"
          onClick={() => router.push(`${baseUrl}/login`)}
        >
          Login
        </button>
      )}
      {token && (
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
          <p className="text-xl text-[#c2c1cf]">
            or choose one of your playlists
          </p>
          <UserPlaylists />
        </>
      )}
    </div>
  );
};

export default HomePage;
