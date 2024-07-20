"use client";

import TracksByArtistList from "~/components/TracksByArtistList";
import usePlaylistPage from "./usePlaylistPage";
import TracksByAlbumList from "~/components/TracksByAlbumList";

const PlaylistStatsPage = ({ params }: { params: { id: string } }) => {
  const { playlistItems, isLoading, error } = usePlaylistPage({
    id: params.id,
  });

  return (
    <div className="flex flex-wrap justify-center gap-16">
      {isLoading && <p>Loading</p>}

      {error && <p>{error.message}</p>}

      {playlistItems && (
        <>
          <TracksByArtistList playlistItems={playlistItems} />
          <TracksByAlbumList playlistItems={playlistItems} />
        </>
      )}
    </div>
  );
};

export default PlaylistStatsPage;
