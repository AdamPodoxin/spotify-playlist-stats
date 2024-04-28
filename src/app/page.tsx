import { Suspense } from "react";
import HomePage from "./components/HomePage";

const Home = () => {
	return (
		<>
			<main className="flex min-h-screen flex-col items-center  p-24 gap-4">
				<Suspense>
					<HomePage />
				</Suspense>
			</main>
		</>
	);
};

export default Home;
