"use client";

import TracksByArtistList from "~/components/TracksByArtistList";
import usePlaylistPage from "./usePlaylistPage";
import TracksByAlbumList from "~/components/TracksByAlbumList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const PlaylistStatsPage = ({ params }: { params: { id: string } }) => {
  const { playlistItems, isLoading, error } = usePlaylistPage({
    id: params.id,
  });

  return (
    <>
      {isLoading && <p>Loading</p>}

      {error && <p>{error.message}</p>}

      {playlistItems && (
        <div className="w-[100%] p-8">
          <Tabs defaultValue="artist">
            <TabsList>
              <TabsTrigger value="artist">Sort by artist</TabsTrigger>
              <TabsTrigger value="album">Sort by album</TabsTrigger>
            </TabsList>
            <TabsContent value="artist">
              <TracksByArtistList playlistItems={playlistItems} />
            </TabsContent>
            <TabsContent value="album">
              <TracksByAlbumList playlistItems={playlistItems} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default PlaylistStatsPage;
