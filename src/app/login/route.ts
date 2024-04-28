import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { spotify } from "@/constants";
import { redirect } from "next/navigation";

export const GET = async () => {
	const cookieStore = cookies();

	const spotifyStateValue = uuidv4();
	cookieStore.set(spotify.stateKey, spotifyStateValue);

	const urlSearchParams = new URLSearchParams({
		response_type: "code",
		client_id: spotify.credentials.clientId,
		scope: spotify.scope,
		redirect_uri: "http://localhost:3000/callback",
		state: spotifyStateValue,
	});

	redirect(
		`https://accounts.spotify.com/authorize?${urlSearchParams.toString()}`
	);
};
