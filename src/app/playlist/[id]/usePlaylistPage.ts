"use client";

import { useState, useEffect } from "react";
import useFetch from "~/hooks/useFetch";
import type { PlaylistItem } from "~/types";

const usePlaylistPage = ({ id }: { id: string }) => {
  const { fetchAllPagesAuthenticated } = useFetch();

  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const data = await fetchAllPagesAuthenticated<PlaylistItem>(
          `https://api.spotify.com/v1/playlists/${id}/tracks`,
        );

        setPlaylistItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    void getPlaylistData();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return { playlistItems };
};

export default usePlaylistPage;
