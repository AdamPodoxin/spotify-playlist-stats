"use client";

import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGetTracks from "@/hooks/useGetTracks";
import { sortTracksByArtist } from "@/utils/tracksUtil";

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

			{tracksSortedByArtist && (
				<div className="flex flex-col gap-8 m-8">
					{tracksSortedByArtist.map((tracksForArtist) => (
						<div key={uuidv4()}>
							<p className="text-lg font-bold">
								{!!tracksForArtist.artistName
									? `${tracksForArtist.artistName} with ${
											tracksForArtist.tracks.length
									  } track${tracksForArtist.tracks.length > 1 ? "s" : ""}:`
									: "(no artist)"}
							</p>
							{tracksForArtist.tracks.map((track) => (
								<p key={uuidv4()}>
									{!!track.external_urls.spotify ? (
										<a
											href={track.external_urls.spotify}
											target="_blank"
											referrerPolicy="no-referrer"
										>
											{track.name}
										</a>
									) : (
										track.name
									)}
								</p>
							))}
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default HomePage;
