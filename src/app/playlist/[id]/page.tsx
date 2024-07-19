"use client";

import TracksByArtistList from "~/components/TracksByArtistList";
import usePlaylistPage from "./usePlaylistPage";

const PlaylistStatsPage = ({ params }: { params: { id: string } }) => {
  const { playlistItems } = usePlaylistPage({ id: params.id });

  return (
    <div className="flex gap-16">
      <TracksByArtistList playlistItems={playlistItems} />
    </div>
  );
};

export default PlaylistStatsPage;
