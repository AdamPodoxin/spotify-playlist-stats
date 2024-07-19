"use client";

import type { PlaylistItem } from "~/types";
import useTracksByArtistList from "./useTracksByArtistList";

const TracksByArtistList = ({
  playlistItems,
}: {
  playlistItems: PlaylistItem[];
}) => {
  const { tracksForArtists } = useTracksByArtistList({ playlistItems });

  return (
    <div>
      <p className="my-4 text-2xl">Artists:</p>
      <div className="flex flex-col gap-4">
        {tracksForArtists.map(([artist, tracks]) => {
          const artistName = !!artist.name ? artist.name : "(no artist)";
          const artistUrl = artist.external_urls.spotify;

          return (
            <div key={artist.id ?? artist.name}>
              {artistUrl && (
                <a
                  href={artistUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="my-1 border-b border-solid border-slate-50/50 text-xl"
                >
                  {artistName}
                </a>
              )}

              {!artistUrl && <p className="my-1 text-xl">{artistName}</p>}

              <p className="mb-2 text-lg">{tracks.length} tracks</p>

              <div className="flex flex-col gap-1">
                {tracks.map((track) => {
                  const trackUrl = track.external_urls.spotify;

                  return (
                    <div
                      key={`${artist.id ?? artist.name}-${track.id ?? track.name}`}
                    >
                      {trackUrl && (
                        <a
                          href={trackUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-md border-b border-dashed border-slate-50/20"
                        >
                          {track.name}
                        </a>
                      )}

                      {!trackUrl && (
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
