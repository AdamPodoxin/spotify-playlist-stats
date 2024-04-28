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
		redirect_uri: `${spotify.redirectUriBase}/callback`,
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
	});

	if (!res.ok) {
		redirect("/error");
	}

	const data = (await res.json()) as { access_token: string };

	const accessTokenDataParams = new URLSearchParams({
		access_token: data.access_token,
	});

	redirect(`/?${accessTokenDataParams.toString()}`);
};
