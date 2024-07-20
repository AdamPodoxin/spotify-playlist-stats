"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentToken,
  saveCodeVerifier,
  saveToken,
} from "~/utils/spotifyToken";
import { env } from "~/env";
import type { SpotifyTokenResponse } from "~/types";

const scope = "user-read-private user-read-email playlist-read-private";
const baseUrl = env.NEXT_PUBLIC_BASE_URL;

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encodeBuffer = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const base64encodeString = (input: string) => {
  return btoa(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

const tokenEndpoint = "https://accounts.spotify.com/api/token";

const fetchRefreshToken = async (refreshToken: string) => {
  const encodedAuthorization = base64encodeString(
    `${env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
  );

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedAuthorization}`,
    },
    body: new URLSearchParams({
      client_id: env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as SpotifyTokenResponse;
};

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const getAccessToken = async () => {
      const codeVerifier = generateRandomString(64);
      saveCodeVerifier(codeVerifier);

      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encodeBuffer(hashed);

      const authorizationEndpoint = new URL(
        "https://accounts.spotify.com/authorize",
      );

      authorizationEndpoint.search = new URLSearchParams({
        response_type: "code",
        client_id: env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: `${baseUrl}/callback`,
      }).toString();

      router.push(authorizationEndpoint.toString());
    };

    const refreshAccessToken = async (refreshToken: string) => {
      const newRefreshToken = await fetchRefreshToken(refreshToken);

      if (newRefreshToken) {
        saveToken(newRefreshToken);

        const returnToRouteAfterAuth = localStorage.getItem(
          "returnToRouteAfterAuth",
        );
        localStorage.removeItem("returnToRouteAfterAuth");

        router.push(returnToRouteAfterAuth ?? baseUrl);
      }
    };

    const authenticateUser = async () => {
      const currentToken = getCurrentToken();

      if (currentToken.access_token && currentToken.refresh_token) {
        await refreshAccessToken(currentToken.refresh_token);
      } else {
        await getAccessToken();
      }
    };

    void authenticateUser();
  }, [router]);

  return <></>;
};

export default LoginPage;
