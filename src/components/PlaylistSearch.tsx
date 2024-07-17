"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const pathnameRegex = /\/playlist\/([^\/]+)/;

const PlaylistSearch = () => {
  const router = useRouter();

  const [playlistLink, setPlaylistLink] = useState("");

  const loadPlaylistStats = () => {
    try {
      const url = new URL(playlistLink);

      if (url.host !== "open.spotify.com") {
        alert("Please enter a Spotify link");
        return;
      }

      const pathname = url.pathname;
      if (!pathnameRegex.test(pathname)) {
        alert("Please enter a valid link to a Spotify playlist");
        return;
      }

      const playlistId = pathname.split("/")[2];
      router.push(`/playlist/${playlistId}`);
    } catch (_) {
      alert("Please enter a valid link");
    }
  };

  return (
    <div className="flex w-1/2 flex-col gap-4">
      <input
        className="rounded-lg p-2 text-xl text-black"
        placeholder="Playlist link"
        value={playlistLink}
        onChange={(e) => setPlaylistLink(e.target.value)}
      />
      <button
        className="rounded-lg bg-[#0b0b16] p-2 text-2xl"
        onClick={() => loadPlaylistStats()}
      >
        Get playlist stats
      </button>
    </div>
  );
};

export default PlaylistSearch;
