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
      <span className="my-4 text-2xl">Artists:</span>
      <div className="flex flex-col gap-4">
        {tracksForArtists.map(([artist, tracks]) => {
          const artistName = !!artist.name ? artist.name : "(no artist)";
          const artistUrl = artist.external_urls.spotify;

          const tracksString = tracks.length > 1 ? "tracks" : "track";

          return (
            <div key={artist.id ?? artist.name} className="flex flex-col gap-1">
              {artistUrl && (
                <a
                  href={artistUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="my-1 w-min text-nowrap bg-slate-50/10 text-xl hover:bg-slate-50/20"
                >
                  {artistName}
                </a>
              )}

              {!artistUrl && (
                <span className="my-1 w-min text-nowrap text-xl">
                  {artistName}
                </span>
              )}

              <span className="mb-2 w-min text-nowrap text-lg">
                {tracks.length} {tracksString}
              </span>

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
                          className="text-md border-b border-dashed border-slate-50/20 hover:border-slate-50/50"
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
