import { v4 as uuidv4 } from "uuid";
import { TracksSortedByArtist } from "@/types";

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
						{!!tracksForArtist.artistName
							? `${tracksForArtist.artistName} with ${
									tracksForArtist.tracks.length
							  } track${tracksForArtist.tracks.length > 1 ? "s" : ""}:`
							: "(no artist)"}
					</p>
					{tracksForArtist.tracks.map((track) => (
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
			))}
		</>
	);
};

export default TracksSortedByArtistList;
