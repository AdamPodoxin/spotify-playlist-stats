"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGetTracks from "@/hooks/useGetTracks";
import { sortTracksByAlbum, sortTracksByArtist } from "@/utils/tracksUtil";
import TracksSortedByArtistList from "./TracksSortedByArtistList";
import TracksSortedByAlbumList from "./TracksSortedByAlbumList";
import PlaylistPicker from "./PlaylistPicker";

const HomePage = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [playlistId, setPlaylistId] = useState("");

	const accessToken = searchParams.get("access_token");

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

	if (!accessToken) {
		router.push("/login");

		return <></>;
	}

	return (
		<>
			<PlaylistPicker
				playlistId={playlistId}
				setPlaylistId={setPlaylistId}
				accessToken={accessToken}
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
