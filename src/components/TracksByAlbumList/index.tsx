"use client";

import Image from "next/image";
import type { PlaylistItem } from "~/types";
import useTracksByAlbumList from "./useTracksByAlbumList";

const TracksByAlbumList = ({
  playlistItems,
}: {
  playlistItems: PlaylistItem[];
}) => {
  const { tracksForAlbums } = useTracksByAlbumList({ playlistItems });

  return (
    <div>
      <span className="my-4 text-2xl">Albums:</span>
      <div className="flex flex-col gap-8">
        {tracksForAlbums.map(([album, tracks]) => {
          const albumName = !!album.name ? album.name : "(no album)";
          const albumUrl = album.external_urls.spotify;

          const tracksString = tracks.length > 1 ? "tracks" : "track";

          return (
            <div key={album.id ?? album.name} className="flex flex-col">
              <span className="flex items-end gap-1">
                {!!album.images.length && album.images[0] && (
                  <Image
                    src={album.images[0].url}
                    alt={"Album image"}
                    width={100}
                    height={100}
                  />
                )}
                {albumUrl && (
                  <a
                    href={albumUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-min text-nowrap bg-slate-50/10 text-xl hover:bg-slate-50/20"
                  >
                    {albumName}
                  </a>
                )}

                {!albumUrl && (
                  <span className="my-1 w-min text-nowrap text-xl">
                    {albumName}
                  </span>
                )}
              </span>

              <span className="mb-2 w-min text-nowrap text-lg">
                {tracks.length} {tracksString}
              </span>

              <div className="flex flex-col gap-1">
                {tracks.map((track) => {
                  const trackUrl = track.external_urls.spotify;

                  return (
                    <div
                      key={`${album.id ?? album.name}-${track.id ?? track.name}`}
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

export default TracksByAlbumList;
