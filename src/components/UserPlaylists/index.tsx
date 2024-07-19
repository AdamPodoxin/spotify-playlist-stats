"use client";

import Image from "next/image";
import { env } from "~/env";
import useUserPlaylists from "./useUserPlaylists";

const UserPlaylists = () => {
  const { userPlaylists } = useUserPlaylists();

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
