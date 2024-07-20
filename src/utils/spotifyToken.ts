import type { SpotifyTokenResponse } from "~/types";

export const getCurrentToken = () => {
  const expiresString = localStorage.getItem("expires");
  const expiresTime = expiresString ? parseInt(expiresString) : null;

  return {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    expiresTime,
  };
};

export const saveToken = ({
  access_token,
  refresh_token,
  expires_in,
}: SpotifyTokenResponse) => {
  const now = new Date();
  const expires = new Date(now.getTime() + expires_in);

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires", expires.getTime().toString());
};

export const saveCodeVerifier = (codeVerifier: string) => {
  window.localStorage.setItem("code_verifier", codeVerifier);
};

export const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_in");
  localStorage.removeItem("code_verifier");
};
