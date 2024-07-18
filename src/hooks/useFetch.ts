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

  const fetchAuthenticated = async <T>(
    url: string | URL,
    options?: RequestInit | null,
  ) => {
    const { access_token } = getCurrentToken();

    if (!access_token) {
      router.push(loginUrl);
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
      router.push(loginUrl);
    } else if (!response.ok) {
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

      pages.push(data);

      const next = data.next;
      if (!next) {
        break;
      }

      fetchUrl = next;
    }

    return pages.flatMap((r) => r.items);
  };

  return { fetchAuthenticated, fetchAllPagesAuthenticated };
};

export default useFetch;
