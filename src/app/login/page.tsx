"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveCodeVerifier } from "~/utils/spotifyToken";

const scope = "user-read-private user-read-email";

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

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      const codeVerifier = generateRandomString(64);
      saveCodeVerifier(codeVerifier);

      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);

      const authorizationEndpoint = new URL(
        "https://accounts.spotify.com/authorize",
      );

      authorizationEndpoint.search = new URLSearchParams({
        response_type: "code",
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/callback`,
      }).toString();

      router.push(authorizationEndpoint.toString());
    };

    void authenticateUser();
  }, [router]);

  return <></>;
};

export default LoginPage;
