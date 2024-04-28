import type { sortTracksByAlbum, sortTracksByArtist } from "./utils/tracksUtil";

type ExternalUrls = {
	spotify: string | undefined;
};

export type Artist = {
	name: string;
	external_urls: ExternalUrls;
};

export type Album = {
	name: string;
	artists: Artist[] | undefined;
	external_urls: ExternalUrls;
};

export type Track = {
	name: string;
	album: Album | undefined;
	artists: Artist[] | undefined;
	external_urls: ExternalUrls;
};

export type TracksSortedByArtist = ReturnType<typeof sortTracksByArtist>;
export type TracksSortedByAlbum = ReturnType<typeof sortTracksByAlbum>;
