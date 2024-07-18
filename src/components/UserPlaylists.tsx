"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { env } from "~/env";
import useFetch from "~/hooks/useFetch";

type UserPlaylistType = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
};

const UserPlaylists = () => {
  const { fetchAllPagesAuthenticated } = useFetch();

  const [userPlaylists, setUserPlaylists] = useState<UserPlaylistType[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const getUserPlaylists = async () => {
        try {
          const data = await fetchAllPagesAuthenticated<UserPlaylistType>(
            "https://api.spotify.com/v1/me/playlists",
          );

          setUserPlaylists(data);
        } catch (error) {
          console.error(error);
        }
      };

      void getUserPlaylists();
    };

    void fetchPlaylists();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-wrap gap-4">
      {userPlaylists.map((playlist) => {
        return (
          <div key={playlist.id}>
            <a
              className="m-4 flex flex-col items-center gap-2"
              href={`${env.NEXT_PUBLIC_BASE_URL}/playlist/${playlist.id}`}
            >
              <Image
                src={playlist.images[0]?.url ?? ""}
                alt={"Playlist icon"}
                width={200}
                height={200}
              />
              <p className="max-w-48 text-center text-xl">{playlist.name}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default UserPlaylists;
