import { v4 as uuidv4 } from "uuid";
import { TracksSortedByArtist } from "@/types";
import TrackList from "./TrackList";
import { ReactNode } from "react";

type WrapperProps = {
	tracksForArtist: TracksSortedByArtist[number];
	title: ReactNode;
};

const Wrapper = ({ tracksForArtist, title }: WrapperProps) => {
	return (
		<div>
			<p className="text-xl font-bold">{title}:</p>
			<TrackList tracks={tracksForArtist.tracks} />
		</div>
	);
};

type TracksSortedByArtistListProps = {
	tracksSortedByArtist: TracksSortedByArtist;
};

const TracksSortedByArtistList = ({
	tracksSortedByArtist,
}: TracksSortedByArtistListProps) => {
	return (
		<>
			<p className="font-bold text-2xl">Tracks sorted by artist</p>
			{tracksSortedByArtist.map((tracksForArtist) => {
				if (!tracksForArtist.artist.name) {
					return (
						<Wrapper
							key={uuidv4()}
							tracksForArtist={tracksForArtist}
							title={"(no artist)"}
						/>
					);
				}

				const numberOfTracksText = `with ${
					tracksForArtist.tracks.length
				} track${tracksForArtist.tracks.length > 1 ? "s" : ""}`;

				if (!tracksForArtist.artist.external_urls.spotify) {
					return (
						<Wrapper
							key={uuidv4()}
							tracksForArtist={tracksForArtist}
							title={`${tracksForArtist.artist.name} ${numberOfTracksText}`}
						/>
					);
				}

				return (
					<Wrapper
						key={uuidv4()}
						tracksForArtist={tracksForArtist}
						title={
							<>
								<a
									href={tracksForArtist.artist.external_urls.spotify}
									target="_blank"
									referrerPolicy="no-referrer"
								>
									{tracksForArtist.artist.name}
								</a>{" "}
								{numberOfTracksText}
							</>
						}
					/>
				);
			})}
		</>
	);
};

export default TracksSortedByArtistList;
