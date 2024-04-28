import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { clientId } from "@/constants";

const scope = "playlist-read-private";

const useSpotifyAccessToken = () => {
	const router = useRouter();

	const spotifyAccessTokenFromCookies = Cookies.get("spotifyAccessToken");

	if (spotifyAccessTokenFromCookies) {
		return spotifyAccessTokenFromCookies;
	}

	const queryString = new URLSearchParams({
		response_type: "code",
		client_id: clientId,
		scope: scope,
		redirect_uri: "http://localhost:3000/callback",
	});

	router.push(
		`https://accounts.spotify.com/authorize?${queryString.toString()}`
	);

	return null;
};

export default useSpotifyAccessToken;
