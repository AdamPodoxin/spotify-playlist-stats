"use client";

import { useEffect, useState } from "react";
import useFetch from "~/hooks/useFetch";
import { uniqueBy } from "~/utils/arrayUtils";

type Album = {
  id: string;
  name: string;
};

type Artist = {
  id: string;
  name: string;
};

type Track = {
  id: string;
  album: Album;
  artists: Artist[];
  name: string;
};

type PlaylistItem = {
  track: Track;
};

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

  const [tracksForArtists, setTracksForArtists] = useState<[Artist, Track[]][]>(
    [],
  );

  useEffect(() => {
    const artists = uniqueBy(
      playlistItems.flatMap((item) => item.track.artists),
      (artist) => artist.id,
    );

    const map: [Artist, Track[]][] = [];

    artists.forEach((artist) => {
      const tracks = playlistItems
        .map((item) => item.track)
        .filter((track) => track.artists.some((a) => a.id === artist.id));
      map.push([artist, tracks]);
    });

    map.sort(([_, tracks1], [__, tracks2]) => {
      return tracks2.length - tracks1.length;
    });

    setTracksForArtists(map);
  }, [playlistItems]);

  return (
    <div className="flex gap-16">
      <div>
        <p className="my-4 text-2xl">Artists:</p>
        <div className="flex flex-col gap-4">
          {tracksForArtists.map(([artist, tracks]) => {
            return (
              <div key={artist.id}>
                <p className="my-1 text-xl">{artist.name}</p>
                <p className="mb-2 text-lg">{tracks.length} tracks</p>
                {tracks.map((track) => {
                  return (
                    <div key={`${artist.id}-${track.id}`}>
                      <p className="text-md">{track.name}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistStatsPage;
