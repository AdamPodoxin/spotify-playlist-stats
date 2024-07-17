"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { type SpotifyTokenResponse } from "~/types";

const tokenEndpoint = "https://accounts.spotify.com/api/token";

// TODO: env variable
const baseUrl = `http://localhost:3000`;

const fetchToken = async (code: string) => {
  const code_verifier = localStorage.getItem("code_verifier");
  console.log("code verifier", code_verifier);

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? "",
      grant_type: "authorization_code",
      code,
      redirect_uri: `${baseUrl}/callback`,
      code_verifier: code_verifier ?? "",
    }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as SpotifyTokenResponse;
};

const CallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getToken = async (code: string) => {
      const token = await fetchToken(code);

      if (token) {
        localStorage.setItem("access_token", token.access_token);
        router.push(baseUrl);
      }
    };

    console.log("get token");
    const code = searchParams.get("code");

    if (code) {
      console.log("code", code);
      void getToken(code);
    }
  }, [router, searchParams]);
};

export default CallbackPage;
