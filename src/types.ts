export type SpotifyTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type Album = {
  id?: string | null;
  name?: string | null;
  external_urls: {
    spotify?: string | null;
  };
  images: {
    url: string;
    height?: number | null;
    width?: number | null;
  }[];
};

export type SimplifiedArtist = {
  id?: string | null;
  name: string;
  external_urls: {
    spotify?: string | null;
  };
};

export type Track = {
  id?: string | null;
  album: Album;
  artists: SimplifiedArtist[];
  name: string;
  external_urls: {
    spotify?: string | null;
  };
};

export type PlaylistItem = {
  track: Track;
};
