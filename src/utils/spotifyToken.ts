import { type SpotifyTokenResponse } from "~/types";

export const getCurrentToken = () => {
  // TODO: access token in cookies with expiration
  return {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    refresh_in: localStorage.getItem("refresh_in"),
  };
};

export const saveToken = (tokenResponse: SpotifyTokenResponse) => {
  const { access_token, refresh_token, expires_in } = tokenResponse;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires_in", `${expires_in}`);
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
