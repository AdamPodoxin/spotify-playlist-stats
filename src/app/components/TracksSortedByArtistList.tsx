import { v4 as uuidv4 } from "uuid";
import { TracksSortedByArtist } from "@/types";
import TrackList from "./TrackList";

type TracksSortedByArtistListProps = {
	tracksSortedByArtist: TracksSortedByArtist;
};

const TracksSortedByArtistList = ({
	tracksSortedByArtist,
}: TracksSortedByArtistListProps) => {
	return (
		<>
			{tracksSortedByArtist.map((tracksForArtist) => (
				<div key={uuidv4()}>
					<p className="text-lg font-bold">
						{!!tracksForArtist.artist.name
							? `${tracksForArtist.artist.name} with ${
									tracksForArtist.tracks.length
							  } track${tracksForArtist.tracks.length > 1 ? "s" : ""}:`
							: "(no artist)"}
					</p>
					<TrackList tracks={tracksForArtist.tracks} />
				</div>
			))}
		</>
	);
};

export default TracksSortedByArtistList;
