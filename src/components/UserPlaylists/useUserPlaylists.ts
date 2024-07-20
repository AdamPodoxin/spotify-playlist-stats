"use client";

import { useQuery } from "@tanstack/react-query";
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

  const { isPending, isFetching, data, error } = useQuery({
    queryKey: ["user", "playlists"],
    queryFn: async () =>
      await fetchAllPagesAuthenticated<UserPlaylist>(
        "https://api.spotify.com/v1/me/playlists",
      ),
  });

  return { isLoading: isPending || isFetching, userPlaylists: data, error };
};

export default useUserPlaylists;
