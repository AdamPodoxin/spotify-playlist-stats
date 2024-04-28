import type { Album, Artist, Track } from "@/types";

export const sortTracksByArtist = (tracks: Track[]) => {
	const artists: Artist[] = [];
	const tracksForArtistMap = new Map<string, Track[]>();

	tracks.forEach((track) => {
		track.artists?.forEach((artist) => {
			if (!artists.some((artistInList) => artistInList.name === artist.name)) {
				artists.push(artist);
				tracksForArtistMap.set(artist.name, []);
			}

			const tracksForArtist = tracksForArtistMap.get(artist.name);
			if (tracksForArtist) {
				tracksForArtist.push(track);
			}
		});
	});

	artists.sort((artist1, artist2) => {
		if (!artist1.name) {
			return Number.MAX_SAFE_INTEGER;
		}
		if (!artist2.name) {
			return Number.MIN_SAFE_INTEGER;
		}

		const numberOfTracksForArtist1 =
			tracksForArtistMap.get(artist1.name)?.length ?? 0;
		const numberOfTracksForArtist2 =
			tracksForArtistMap.get(artist2.name)?.length ?? 0;

		return numberOfTracksForArtist2 - numberOfTracksForArtist1;
	});

	return artists.map((artist) => ({
		artist,
		tracks: tracksForArtistMap.get(artist.name) ?? [],
	}));
};

export const sortTracksByAlbum = (tracks: Track[]) => {
	const albums: Album[] = [];
	const tracksForAlbumMap = new Map<string, Track[]>();

	tracks.forEach((track) => {
		if (track.album) {
			if (!albums.some((album) => album.name === track.album?.name)) {
				albums.push(track.album);
				tracksForAlbumMap.set(track.album.name, []);
			}

			const tracksForAlbum = tracksForAlbumMap.get(track.album.name);
			if (tracksForAlbum) {
				tracksForAlbum.push(track);
			}
		}
	});

	albums.sort((album1, album2) => {
		if (!album1.name) {
			return Number.MAX_SAFE_INTEGER;
		}
		if (!album2.name) {
			return Number.MIN_SAFE_INTEGER;
		}

		const numberOfTracksForAlbum1 =
			tracksForAlbumMap.get(album1.name)?.length ?? 0;
		const numberOfTracksForAlbum2 =
			tracksForAlbumMap.get(album2.name)?.length ?? 0;

		return numberOfTracksForAlbum2 - numberOfTracksForAlbum1;
	});

	return albums.map((album) => ({
		album,
		tracks: tracksForAlbumMap.get(album.name) ?? [],
	}));
};
