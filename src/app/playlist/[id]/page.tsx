"use client";

import { useEffect, useState } from "react";
import { getCurrentToken } from "~/utils/spotifyToken";

const PlaylistStatsPage = ({ params }: { params: { id: string } }) => {
  const [playlistData, setPlaylistData] = useState<unknown>(null);

  useEffect(() => {
    const token = getCurrentToken();

    const getPlaylistData = async () => {
      const data = await fetch(
        `https://api.spotify.com/v1/playlists/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        },
      );

      if (!data.ok) {
        console.error(
          "Error getting playlist data:",
          data.status,
          data.statusText,
        );
        return;
      }

      const json = (await data.json()) as unknown;
      setPlaylistData(json);
    };

    void getPlaylistData();
  }, [params.id]);

  return (
    <div>
      {playlistData ? <p>{JSON.stringify(playlistData, null, 2)}</p> : <></>}
    </div>
  );
};

export default PlaylistStatsPage;
