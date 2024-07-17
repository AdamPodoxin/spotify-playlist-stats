"use client";

import { useState } from "react";

const PlaylistSearch = () => {
  const [playlistLink, setPlaylistLink] = useState("");

  const loadPlaylistStats = () => {
    console.log(playlistLink);
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
