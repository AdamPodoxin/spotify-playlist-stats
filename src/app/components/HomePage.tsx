"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGetTracks from "@/hooks/useGetTracks";
import { sortTracksByAlbum, sortTracksByArtist } from "@/utils/tracksUtil";
import TracksSortedByArtistList from "./TracksSortedByArtistList";
import TracksSortedByAlbumList from "./TracksSortedByAlbumList";

const HomePage = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [playlistId, setPlaylistId] = useState("");

	const accessToken = searchParams.get("access_token");

	if (!accessToken) {
		router.push("/login");
	}

	const { tracks, getTracks } = useGetTracks({
		accessToken: accessToken!,
		playlistId,
	});

	const tracksSortedByArtist = useMemo(() => {
		if (tracks.length <= 0) {
			return [];
		}

		return sortTracksByArtist(tracks);
	}, [tracks]);

	const tracksSortedByAlbum = useMemo(() => {
		if (tracks.length <= 0) {
			return [];
		}

		return sortTracksByAlbum(tracks);
	}, [tracks]);

	return (
		<>
			<input
				className="text-black p-2 rounded-lg"
				name="playlist-id"
				placeholder="Playlist ID"
				value={playlistId}
				onChange={(e) => setPlaylistId(e.target.value)}
			/>
			<button
				className="bg-white text-black text-lg py-2 px-4 rounded-lg"
				onClick={() => getTracks()}
			>
				Get playlist stats
			</button>

			<div className="flex justify-center">
				{tracksSortedByArtist && (
					<div className="flex-1 flex flex-col gap-8 m-8">
						<TracksSortedByArtistList
							tracksSortedByArtist={tracksSortedByArtist}
						/>
					</div>
				)}

				{tracksSortedByAlbum && (
					<div className="flex-1 flex flex-col gap-8 m-8">
						<TracksSortedByAlbumList
							tracksSortedByAlbum={tracksSortedByAlbum}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default HomePage;
