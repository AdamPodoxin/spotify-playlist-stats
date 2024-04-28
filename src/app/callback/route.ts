import { spotify } from "@/constants";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
	const code = request.nextUrl.searchParams.get("code");
	const state = request.nextUrl.searchParams.get("state");
	const storedState = request.cookies.get(spotify.stateKey)?.value;

	if (!state || state !== storedState) {
		redirect("/error");
	}

	const body = new URLSearchParams({
		code: code ?? "",
		grant_type: "authorization_code",
		redirect_uri: "http://localhost:3000/callback",
	});

	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${btoa(
				`${spotify.credentials.clientId}:${spotify.credentials.clientSecret}`
			)}`,
		},
		body: body,
		mode: "no-cors",
	});

	if (!res.ok) {
		redirect("/error");
	}

	var data = await res.json();

	const accessTokenDataParams = new URLSearchParams({
		access_token: data.access_token,
		refresh_token: data.refresh_token,
	});

	redirect(`/?${accessTokenDataParams.toString()}`);
};
