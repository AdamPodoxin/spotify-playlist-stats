"use client";

import TracksByArtistList from "~/components/TracksByArtistList";
import usePlaylistPage from "./usePlaylistPage";
import TracksByAlbumList from "~/components/TracksByAlbumList";

const PlaylistStatsPage = ({ params }: { params: { id: string } }) => {
  const { playlistItems } = usePlaylistPage({ id: params.id });

  return (
    <div className="flex flex-wrap justify-center gap-16">
      <TracksByArtistList playlistItems={playlistItems} />
      <TracksByAlbumList playlistItems={playlistItems} />
    </div>
  );
};

export default PlaylistStatsPage;
