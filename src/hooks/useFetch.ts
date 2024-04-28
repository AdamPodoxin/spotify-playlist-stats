"use client";

import { useRouter } from "next/navigation";

type FetchParams = Parameters<typeof fetch>;

const useFetch = () => {
	const router = useRouter();

	const fetchWrapper = async (...args: FetchParams) => {
		const res = await fetch(...args);

		if (res.status === 401) {
			router.push("/login");
		}

		return res;
	};

	return fetchWrapper;
};

export default useFetch;
