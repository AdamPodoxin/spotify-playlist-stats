"use client";

import { useMemo } from "react";
import type { Album, PlaylistItem, Track } from "~/types";
import { uniqueBy } from "~/utils/arrayUtils";

const useTracksByAlbumList = ({
  playlistItems,
}: {
  playlistItems: PlaylistItem[];
}) => {
  const tracksForAlbums = useMemo(() => {
    const albums = uniqueBy(
      playlistItems.map((item) => item.track.album),
      (album) => album.id ?? album.name,
    );

    const map: [Album, Track[]][] = [];

    albums.forEach((album) => {
      const tracks = playlistItems
        .map((item) => item.track)
        .filter((track) =>
          track.album.id
            ? track.album.id === album.id
            : track.album.name === album.name,
        );
      map.push([album, tracks]);
    });

    map.sort(([album1, tracks1], [album2, tracks2]) => {
      if (!album1.name) {
        return map.length;
      }

      if (!album2.name) {
        return -1;
      }

      return tracks2.length - tracks1.length;
    });

    return map;
  }, [playlistItems]);

  return { tracksForAlbums };
};

export default useTracksByAlbumList;
