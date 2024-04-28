export const spotify = {
	credentials: {
		clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
		clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!,
	},

	stateKey: "spotify_auth_state",

	scope: "playlist-read-private",

	redirectUriBase: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI_BASE,
} as const;
