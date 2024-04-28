"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import useSpotifyAccessToken from "@/hooks/useSpotifyAccessToken";

type Album = {
	name: string;
};

type Artist = {
	name: string;
};

type Track = {
	name: string;
	album: Album | undefined;
	artists: Artist[] | undefined;
};

type PlaylistTrack = {
	track: Track;
};

type PlaylistTracksResponse = {
	limit: number;
	offset: number;
	total: number;
	href: string;
	next: string;
	items: PlaylistTrack[];
};

export default function Home() {
	const [playlistId, setPlaylistId] = useState("");

	const [artists, setArtists] = useState<string[]>([]);
	const [artistMap, setArtistMap] = useState<Map<string, Track[]>>(
		new Map<string, Track[]>()
	);

	const [albums, setAlbums] = useState<string[]>([]);
	const [albumMap, setAlbumMap] = useState<Map<string, Track[]>>(
		new Map<string, Track[]>()
	);

	const spotifyAccessToken = useSpotifyAccessToken();

	const getPlaylistStats = async () => {
		const res = await fetch(
			`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
			{
				headers: {
					Authorization: `Bearer ${spotifyAccessToken}`,
				},
			}
		);

		const playlist = (await res.json()) as PlaylistTracksResponse;

		let songs: Track[] = [];
		songs = songs.concat(
			playlist.items.map((playlistTrack) => playlistTrack.track)
		);

		let offset = playlist.items.length;

		while (songs.length < playlist.total) {
			const queryParams = new URLSearchParams({
				limit: "100",
				offset: `${offset}`,
			});

			const res = await fetch(
				`https://api.spotify.com/v1/playlists/${playlistId}/tracks?${queryParams.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${spotifyAccessToken}`,
					},
				}
			);

			const playlist = (await res.json()) as PlaylistTracksResponse;
			songs = songs.concat(
				playlist.items.map((playlistTrack) => playlistTrack.track)
			);

			offset += playlist.items.length;
		}

		const artists: string[] = [];
		const artistMap = new Map<string, Track[]>();

		// Initialize
		songs.forEach((song) => {
			if (song.artists) {
				song.artists.forEach((artist) => {
					artistMap.set(artist.name, []);
				});
			}
		});

		// Populate
		songs.forEach((song) => {
			if (song.artists) {
				song.artists.forEach((artist) => {
					const artistSongsList = artistMap.get(artist.name);
					if (artistSongsList) {
						artistSongsList.push(song);
					}

					if (!artists.includes(artist.name)) {
						artists.push(artist.name);
					}
				});
			}
		});

		artists.sort((artist1, artist2) => {
			const artist1NumberOfSongs = artistMap.get(artist1)!.length;
			const artist2NumberOfSongs = artistMap.get(artist2)!.length;

			return artist2NumberOfSongs - artist1NumberOfSongs;
		});

		setArtists(artists);
		setArtistMap(artistMap);

		const albums: string[] = [];
		const albumMap = new Map<string, Track[]>();

		// Initialize
		songs.forEach((song) => {
			if (song.album) {
				albumMap.set(song.album.name, []);
			}
		});

		// Populate
		songs.forEach((song) => {
			if (song.album) {
				const albumSongsList = albumMap.get(song.album.name);
				if (albumSongsList) {
					albumSongsList.push(song);
				}

				if (!albums.includes(song.album.name)) {
					albums.push(song.album.name);
				}
			}
		});

		albums.sort((album1, album2) => {
			const album1NumberOfSongs = albumMap.get(album1)!.length;
			const album2NumberOfSongs = albumMap.get(album2)!.length;

			return album2NumberOfSongs - album1NumberOfSongs;
		});

		setAlbums(albums);
		setAlbumMap(albumMap);
	};

	return (
		<main className="flex min-h-screen flex-col items-center  p-24">
			<input
				name="playlist-id"
				placeholder="Playlist ID"
				value={playlistId}
				onChange={(e) => setPlaylistId(e.target.value)}
				className="text-black"
			/>
			<button onClick={() => getPlaylistStats()}>Get Playlist Stats</button>

			<div className="flex flex-row">
				<div className="flex flex-col gap-8 m-8">
					<p className="font-bold text-xl">Artist stats:</p>

					{artists.map((artist) => {
						const artistSongs = artistMap.get(artist);

						return (
							<div key={uuidv4()}>
								<p className="font-bold text-lg">
									{artist} with {artistSongs?.length} songs:
								</p>
								{artistSongs?.map((song) => (
									<p key={uuidv4()}>{song.name}</p>
								))}
							</div>
						);
					})}
				</div>

				<div className="flex flex-col gap-8 m-8">
					<p className="font-bold text-xl">Album stats:</p>

					{albums.map((album) => {
						const albumSongs = albumMap.get(album);

						return (
							<div key={uuidv4()}>
								<p className="font-bold text-lg">
									{album} with {albumSongs?.length} songs:
								</p>
								{albumSongs?.map((song) => (
									<p key={uuidv4()}>{song.name}</p>
								))}
							</div>
						);
					})}
				</div>
			</div>
		</main>
	);
}
