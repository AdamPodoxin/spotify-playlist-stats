"use client";

import { useState } from "react";
import useFetch from "./useFetch";

type PlaylistImage = {
	url: string;
};

type Playlist = {
	id: string;
	name: string;
	images: PlaylistImage[];
};

type UserPlaylistsResponse = {
	limit: number;
	offset: number;
	total: number;
	items: Playlist[];
};

const userPlaylistsBaseUrl = "https://api.spotify.com/v1/me/playlists";

const useGetUserPlaylists = () => {
	const fetchWrapper = useFetch();

	const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

	const fetchUserPlaylists = async (accessToken: string) => {
		const queryParams = new URLSearchParams({
			limit: "50",
		});

		const res = await fetchWrapper(
			`${userPlaylistsBaseUrl}?${queryParams.toString()}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (!res.ok) {
			return [];
		}

		const userPlaylistsData = (await res.json()) as UserPlaylistsResponse;

		const userPlaylists: Playlist[] = [];
		userPlaylistsData.items.forEach((item) => {
			if (!userPlaylists.some((p) => p.id === item.id)) {
				userPlaylists.push(item);
			}
		});

		let offset = userPlaylistsData.items.length;

		while (userPlaylists.length < userPlaylistsData.total) {
			const queryParams = new URLSearchParams({
				limit: "50",
				offset: `${offset}`,
			});

			const res = await fetchWrapper(
				`${userPlaylistsBaseUrl}?${queryParams.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!res.ok) {
				return userPlaylists;
			}

			const userPlaylistsData = (await res.json()) as UserPlaylistsResponse;
			userPlaylistsData.items.forEach((item) => {
				if (!userPlaylists.some((p) => p.id === item.id)) {
					userPlaylists.push(item);
				}
			});

			offset += userPlaylistsData.items.length;
		}

		return userPlaylists;
	};

	const getUserPlaylists = async (accessToken: string) => {
		const userPlaylists = await fetchUserPlaylists(accessToken);
		setUserPlaylists(userPlaylists);
	};

	return {
		userPlaylists,
		getUserPlaylists,
	};
};

export default useGetUserPlaylists;
