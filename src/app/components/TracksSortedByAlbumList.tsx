import { v4 as uuidv4 } from "uuid";
import { TracksSortedByAlbum } from "@/types";
import TrackList from "./TrackList";

type TracksSortedByAlbumListProps = {
	tracksSortedByAlbum: TracksSortedByAlbum;
};

const TracksSortedByAlbumList = ({
	tracksSortedByAlbum,
}: TracksSortedByAlbumListProps) => {
	return (
		<>
			{tracksSortedByAlbum.map((tracksForAlbum) => (
				<div key={uuidv4()}>
					<p className="text-xl font-bold">
						{!!tracksForAlbum.album.name
							? `${tracksForAlbum.album.name} with ${
									tracksForAlbum.tracks.length
							  } track${tracksForAlbum.tracks.length > 1 ? "s" : ""}:`
							: "(no album)"}
					</p>
					{!!tracksForAlbum.album.artists && (
						<p className="font-bold">
							{`Artist${
								tracksForAlbum.album.artists.length > 1 ? "s" : ""
							}: ${tracksForAlbum.album.artists
								.map((artist) => artist.name)
								.join(", ")}`}
						</p>
					)}
					<TrackList tracks={tracksForAlbum.tracks} />
				</div>
			))}
		</>
	);
};

export default TracksSortedByAlbumList;
