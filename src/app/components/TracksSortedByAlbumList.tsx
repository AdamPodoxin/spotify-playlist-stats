import { v4 as uuidv4 } from "uuid";
import { type ReactNode } from "react";
import type { TracksSortedByAlbum } from "@/types";
import TrackList from "./TrackList";

type WrapperProps = {
	tracksForAlbum: TracksSortedByAlbum[number];
	title: ReactNode;
};

const Wrapper = ({ tracksForAlbum, title }: WrapperProps) => {
	return (
		<div>
			<p className="text-xl font-bold">{title}:</p>
			{!!tracksForAlbum.album.artists?.length && (
				<p className="font-bold">
					{`Artist${tracksForAlbum.album.artists.length > 1 ? "s" : ""}: `}
					{tracksForAlbum.album.artists.map((artist, i) => {
						const isLastArtist =
							!!tracksForAlbum.album.artists &&
							i === tracksForAlbum.album.artists.length - 1;

						return (
							<span key={uuidv4()}>
								<span>
									{!!artist.external_urls.spotify ? (
										<a
											href={artist.external_urls.spotify}
											target="_blank"
											referrerPolicy="no-referrer"
										>
											{artist.name}
										</a>
									) : (
										artist.name
									)}
								</span>
								{!isLastArtist && ", "}
							</span>
						);
					})}
				</p>
			)}
			<TrackList tracks={tracksForAlbum.tracks} />
		</div>
	);
};

type TracksSortedByAlbumListProps = {
	tracksSortedByAlbum: TracksSortedByAlbum;
};

const TracksSortedByAlbumList = ({
	tracksSortedByAlbum,
}: TracksSortedByAlbumListProps) => {
	return (
		<>
			<p className="font-bold text-2xl">Tracks sorted by album</p>

			{tracksSortedByAlbum.map((tracksForAlbum) => {
				if (!tracksForAlbum.album.name) {
					return (
						<Wrapper
							key={uuidv4()}
							tracksForAlbum={tracksForAlbum}
							title={"(no album)"}
						/>
					);
				}

				if (!tracksForAlbum.album.external_urls.spotify) {
					return (
						<Wrapper
							key={uuidv4()}
							tracksForAlbum={tracksForAlbum}
							title={`${tracksForAlbum.album.name} with ${
								tracksForAlbum.tracks.length
							} track${tracksForAlbum.tracks.length > 1 ? "s" : ""}`}
						/>
					);
				}

				return (
					<Wrapper
						key={uuidv4()}
						tracksForAlbum={tracksForAlbum}
						title={
							<>
								<a
									href={tracksForAlbum.album.external_urls.spotify}
									target="_blank"
									referrerPolicy="no-referrer"
								>
									{tracksForAlbum.album.name}
								</a>{" "}
								{`with ${tracksForAlbum.tracks.length} track${
									tracksForAlbum.tracks.length > 1 ? "s" : ""
								}`}
							</>
						}
					/>
				);
			})}
		</>
	);
};

export default TracksSortedByAlbumList;
