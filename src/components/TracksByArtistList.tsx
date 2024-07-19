import { useState, useEffect } from "react";
import type { Artist, PlaylistItem, Track } from "~/types";
import { uniqueBy } from "~/utils/arrayUtils";

const TracksByArtistList = ({
  playlistItems,
}: {
  playlistItems: PlaylistItem[];
}) => {
  const [tracksForArtists, setTracksForArtists] = useState<[Artist, Track[]][]>(
    [],
  );

  useEffect(() => {
    const artists = uniqueBy(
      playlistItems.flatMap((item) => item.track.artists),
      (artist) => artist.id ?? artist.name,
    );

    const map: [Artist, Track[]][] = [];

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

    setTracksForArtists(map);
  }, [playlistItems]);

  return (
    <div>
      <p className="my-4 text-2xl">Artists:</p>
      <div className="flex flex-col gap-4">
        {tracksForArtists.map(([artist, tracks]) => {
          return (
            <div key={artist.id ?? artist.name}>
              <p className="my-1 text-xl">
                {!!artist.name ? artist.name : "(no artist)"}
              </p>
              <p className="mb-2 text-lg">{tracks.length} tracks</p>
              <div className="flex flex-col gap-1">
                {tracks.map((track) => {
                  if (!track.external_urls) {
                    console.log(track.name);
                  }
                  const spotifyUrl = track.external_urls.spotify;

                  return (
                    <div
                      key={`${artist.id ?? artist.name}-${track.id ?? track.name}`}
                    >
                      {spotifyUrl && (
                        <a
                          href={spotifyUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-md border-b border-dashed border-slate-50/20"
                        >
                          {track.name}
                        </a>
                      )}
                      {!spotifyUrl && (
                        <span className="text-md">{track.name}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TracksByArtistList;
