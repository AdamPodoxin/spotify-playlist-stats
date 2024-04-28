import { Track } from "@/types";

export const sortTracksByArtist = (tracks: Track[]) => {
	const artistNames: string[] = [];
	const tracksForArtistMap = new Map<string, Track[]>();

	tracks.forEach((track) => {
		track.artists?.forEach((artist) => {
			if (!artistNames.includes(artist.name)) {
				artistNames.push(artist.name);
				tracksForArtistMap.set(artist.name, []);
			}

			const tracksForArtist = tracksForArtistMap.get(artist.name);
			if (tracksForArtist) {
				tracksForArtist.push(track);
			}
		});
	});

	artistNames.sort((artist1, artist2) => {
		if (!artist1) {
			return Number.MAX_SAFE_INTEGER;
		}
		if (!artist2) {
			return Number.MIN_SAFE_INTEGER;
		}

		const numberOfTracksForArtist1 =
			tracksForArtistMap.get(artist1)?.length ?? 0;
		const numberOfTracksForArtist2 =
			tracksForArtistMap.get(artist2)?.length ?? 0;

		return numberOfTracksForArtist2 - numberOfTracksForArtist1;
	});

	return artistNames.map((artistName) => ({
		artistName,
		tracks: tracksForArtistMap.get(artistName) ?? [],
	}));
};
