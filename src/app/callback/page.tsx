"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { clientId, clientSecret } from "@/constants";

const useCallbackPage = () => {
	const router = useRouter();

	if (Cookies.get("spotifyAccessToken")) {
		router.push("/");
	}

	const code = new URLSearchParams(window.location.search).get("code");

	const body = new URLSearchParams({
		code: code ?? "",
		grant_type: "authorization_code",
		redirect_uri: "http://localhost:3000/callback",
	});

	const getAccessToken = async () => {
		const res = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
			},
			body: body,
		});

		const data = await res.json();

		const accessToken = data.access_token as string | undefined;
		const expiresInSeconds = data.expires_in;

		const expires = new Date();
		expires.setSeconds(expires.getSeconds() + expiresInSeconds);

		if (accessToken) {
			Cookies.set("spotifyAccessToken", accessToken, {
				expires: expires,
			});
			router.push("/");
		}
	};

	if (code) {
		getAccessToken();
	}
};

const CallbackPage = () => {
	useCallbackPage();

	return <></>;
};

export default CallbackPage;
