import { v4 as uuidv4 } from "uuid";
import type { Track } from "@/types";

type TrackListProps = {
	tracks: Track[];
};

const TrackList = ({ tracks }: TrackListProps) => {
	return (
		<div className="mt-2 flex flex-col gap-1">
			{tracks.map((track) => (
				<p key={uuidv4()}>
					{!!track.external_urls.spotify ? (
						<a
							href={track.external_urls.spotify}
							target="_blank"
							referrerPolicy="no-referrer"
						>
							{track.name}
						</a>
					) : (
						track.name
					)}
				</p>
			))}
		</div>
	);
};

export default TrackList;
