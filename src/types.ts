export type SpotifyTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type Album = {
  id?: string | null;
  name?: string | null;
};

export type Artist = {
  id?: string | null;
  name: string;
};

export type Track = {
  id?: string | null;
  album: Album;
  artists: Artist[];
  name: string;
  external_urls: {
    spotify?: string | null;
  };
};

export type PlaylistItem = {
  track: Track;
};
