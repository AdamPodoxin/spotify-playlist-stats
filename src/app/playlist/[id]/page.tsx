"use client";

import { useEffect, useState } from "react";
import useFetch from "~/hooks/useFetch";

const PlaylistStatsPage = ({ params }: { params: { id: string } }) => {
  const { fetchAllPagesAuthenticated } = useFetch();

  const [playlistData, setPlaylistData] = useState<unknown>(null);

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const data = await fetchAllPagesAuthenticated<unknown>(
          `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
        );

        setPlaylistData(data);
      } catch (error) {
        console.error(error);
      }
    };

    void getPlaylistData();
  }, [params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {playlistData ? <p>{JSON.stringify(playlistData, null, 2)}</p> : <></>}
    </div>
  );
};

export default PlaylistStatsPage;
