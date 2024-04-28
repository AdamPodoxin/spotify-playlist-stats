"use client";

import { useState } from "react";
import type { User, Track } from "@/types";
import useFetch from "./useFetch";

type PlaylistTrack = {
	track: Track;
	owner: User;
};

type PlaylistTracksResponse = {
	limit: number;
	offset: number;
	total: number;
	items: PlaylistTrack[];
};

type UseGetTracksProps = {
	playlistId: string;
	accessToken: string;
};

const useGetTracks = ({ playlistId, accessToken }: UseGetTracksProps) => {
	const fetchWrapper = useFetch();

	const [tracks, setTracks] = useState<Track[]>([]);

	const fetchPlaylistTracks = async ({
		playlistId,
		accessToken,
	}: UseGetTracksProps) => {
		const res = await fetchWrapper(
			`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (!res.ok) {
			return [];
		}

		const playlistData = (await res.json()) as PlaylistTracksResponse;

		let tracks: Track[] = [];
		tracks = tracks.concat(
			playlistData.items.map((playlistTrack) => playlistTrack.track)
		);

		let offset = playlistData.items.length;

		while (tracks.length < playlistData.total) {
			const queryParams = new URLSearchParams({
				limit: "50",
				offset: `${offset}`,
			});

			const res = await fetchWrapper(
				`https://api.spotify.com/v1/playlists/${playlistId}/tracks?${queryParams.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!res.ok) {
				return tracks;
			}

			const playlist = (await res.json()) as PlaylistTracksResponse;
			tracks = tracks.concat(
				playlist.items.map((playlistTrack) => playlistTrack.track)
			);

			offset += playlist.items.length;
		}

		return tracks;
	};

	const getTracks = async () => {
		const tracks = await fetchPlaylistTracks({
			playlistId,
			accessToken,
		});

		setTracks(tracks);
	};

	return {
		tracks,
		getTracks,
	};
};

export default useGetTracks;
