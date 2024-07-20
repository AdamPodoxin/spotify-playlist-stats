"use client";

import { useQuery } from "@tanstack/react-query";
import useFetch from "~/hooks/useFetch";
import type { PlaylistItem } from "~/types";

const usePlaylistPage = ({ id }: { id: string }) => {
  const { fetchAllPagesAuthenticated } = useFetch();

  const { isPending, isFetching, data, error } = useQuery({
    queryKey: ["playlist"],
    queryFn: async () =>
      await fetchAllPagesAuthenticated<PlaylistItem>(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
      ),
  });

  return {
    isLoading: isPending || isFetching,
    playlistItems: data,
    error,
  };
};

export default usePlaylistPage;
