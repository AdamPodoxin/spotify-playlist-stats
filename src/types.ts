import { sortTracksByArtist } from "./utils/tracksUtil";

export type Album = {
	name: string;
	artists: Artist[] | undefined;
};

export type Artist = {
	name: string;
};

export type Track = {
	name: string;
	album: Album | undefined;
	artists: Artist[] | undefined;
	external_urls: {
		spotify: string | undefined;
	};
};

export type TracksSortedByArtist = ReturnType<typeof sortTracksByArtist>;
