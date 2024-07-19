"use client";

import { useState, useEffect } from "react";
import useFetch from "~/hooks/useFetch";

type UserPlaylist = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
};

const useUserPlaylists = () => {
  const { fetchAllPagesAuthenticated } = useFetch();

  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const getUserPlaylists = async () => {
        try {
          const data = await fetchAllPagesAuthenticated<UserPlaylist>(
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

  return { userPlaylists };
};

export default useUserPlaylists;
