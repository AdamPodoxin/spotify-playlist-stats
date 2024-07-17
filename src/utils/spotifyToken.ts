import { type SpotifyTokenResponse } from "~/types";

export const getCurrentToken = () => {
  return {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    refresh_in: localStorage.getItem("refresh_in"),
    expires: localStorage.getItem("expires"),
  };
};

export const saveToken = (tokenResponse: SpotifyTokenResponse) => {
  const { access_token, refresh_token, expires_in } = tokenResponse;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires_in", `${expires_in}`);

  const now = new Date();
  const expiry = new Date(now.getTime() + expires_in * 1000);
  localStorage.setItem("expires", expiry.toString());
};
