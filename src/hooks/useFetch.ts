"use client";

import { useRouter } from "next/navigation";
import { getCurrentToken } from "../utils/spotifyToken";
import { env } from "~/env";

type PaginatedResponse<T> = {
  items: T[];
  next: string | null;
};

const loginUrl = `${env.NEXT_PUBLIC_BASE_URL}/login`;

const useFetch = () => {
  const router = useRouter();

  const saveCurrentRoute = () => {
    const currentRoute = location.href.replace(location.origin, "");
    localStorage.setItem("returnToRouteAfterAuth", currentRoute);
  };

  const fetchAuthenticated = async <T>(
    url: string | URL,
    options?: RequestInit | null,
  ) => {
    const { access_token, expiresTime } = getCurrentToken();

    if (!access_token || (expiresTime && Date.now() > expiresTime)) {
      saveCurrentRoute();

      router.push(loginUrl);
      return null;
    }

    const authenticatedOptions = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${access_token}`,
      },
    };

    const response = await fetch(url, authenticatedOptions);

    if (response.status === 401) {
      saveCurrentRoute();

      router.push(loginUrl);
      return null;
    }

    if (!response.ok) {
      throw new Error(`Call failed with status ${response.status}`, {
        cause: response.statusText,
      });
    }

    const data = (await response.json()) as T;
    return data;
  };

  const fetchAllPagesAuthenticated = async <ItemType>(
    url: string | URL,
    options?: RequestInit | null,
  ) => {
    const pages: PaginatedResponse<ItemType>[] = [];

    let fetchUrl = url;

    while (fetchUrl) {
      const data = await fetchAuthenticated<PaginatedResponse<ItemType>>(
        fetchUrl,
        options,
      );

      if (data) {
        pages.push(data);
      }

      const next = data?.next;
      if (!next) {
        break;
      }

      fetchUrl = next;
    }

    if (pages.length === 0) {
      return [];
    }

    return pages.flatMap((r) => r.items);
  };

  return { fetchAuthenticated, fetchAllPagesAuthenticated };
};

export default useFetch;
