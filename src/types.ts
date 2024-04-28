export type Album = {
	name: string;
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
