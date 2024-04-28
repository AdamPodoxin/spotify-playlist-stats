"use client";

import { useRouter, useSearchParams } from "next/navigation";

const HomePage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const accessToken = searchParams.get("access_token");

	if (!accessToken) {
		router.push("/login");
	}

	return <></>;
};

export default HomePage;
