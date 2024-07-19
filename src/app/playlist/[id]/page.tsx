"use client";

import { useEffect, useState } from "react";
import TracksByArtistList from "~/components/TracksByArtistList";
import useFetch from "~/hooks/useFetch";
import type { PlaylistItem } from "~/types";

const PlaylistStatsPage = ({ params }: { params: { id: string } }) => {
  const { fetchAllPagesAuthenticated } = useFetch();

  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const data = await fetchAllPagesAuthenticated<PlaylistItem>(
          `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
        );

        setPlaylistItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    void getPlaylistData();
  }, [params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex gap-16">
      <TracksByArtistList playlistItems={playlistItems} />
    </div>
  );
};

export default PlaylistStatsPage;
