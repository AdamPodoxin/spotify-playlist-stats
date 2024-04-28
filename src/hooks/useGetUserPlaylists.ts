"use client";

import { useState } from "react";
import type { User } from "@/types";
import useFetch from "./useFetch";

type PlaylistImage = {
	url: string;
};

type Playlist = {
	id: string;
	name: string;
	images: PlaylistImage[];
	owner: User;
};

type UserPlaylistsResponse = {
	limit: number;
	offset: number;
	total: number;
	items: Playlist[];
};

const usersBaseUrl = "https://api.spotify.com/v1/me";
const userPlaylistsBaseUrl = "https://api.spotify.com/v1/me/playlists";

const useGetUserPlaylists = () => {
	const fetchWrapper = useFetch();

	const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

	const fetchUser = async (accessToken: string) => {
		const res = await fetchWrapper(usersBaseUrl, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!res.ok) {
			return null;
		}

		const userData = (await res.json()) as User;

		return userData;
	};

	const fetchUserPlaylists = async (accessToken: string) => {
		const res = await fetchWrapper(userPlaylistsBaseUrl, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!res.ok) {
			return [];
		}

		const userPlaylistsData = (await res.json()) as UserPlaylistsResponse;

		let userPlaylists: Playlist[] = [];
		userPlaylists = userPlaylists.concat(userPlaylistsData.items);

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
			userPlaylists = userPlaylists.concat(userPlaylistsData.items);

			offset += userPlaylistsData.items.length;
		}

		return userPlaylists;
	};

	const getUserPlaylists = async (accessToken: string) => {
		const user = await fetchUser(accessToken);
		const userPlaylists = await fetchUserPlaylists(accessToken);

		if (user) {
			setUserPlaylists(userPlaylists.filter((p) => p.owner.id === user.id));
		}
	};

	return {
		userPlaylists,
		getUserPlaylists,
	};
};

export default useGetUserPlaylists;
