"use client";

import { useMemo } from "react";
import type { SimplifiedArtist, PlaylistItem, Track } from "~/types";
import { uniqueBy } from "~/utils/arrayUtils";

const useTracksByArtistList = ({
  playlistItems,
}: {
  playlistItems: PlaylistItem[];
}) => {
  const tracksForArtists = useMemo(() => {
    const artists = uniqueBy(
      playlistItems.flatMap((item) => item.track.artists),
      (artist) => artist.id ?? artist.name,
    );

    const map: [SimplifiedArtist, Track[]][] = [];

    artists.forEach((artist) => {
      const tracks = playlistItems
        .map((item) => item.track)
        .filter((track) =>
          track.artists.some((a) =>
            a.id ? a.id === artist.id : a.name === artist.name,
          ),
        );
      map.push([artist, tracks]);
    });

    map.sort(([artist1, tracks1], [artist2, tracks2]) => {
      if (!artist1.name) {
        return map.length;
      }

      if (!artist2.name) {
        return -1;
      }

      return tracks2.length - tracks1.length;
    });

    return map;
  }, [playlistItems]);

  return { tracksForArtists };
};

export default useTracksByArtistList;
