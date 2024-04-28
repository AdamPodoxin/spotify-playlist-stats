import { v4 as uuidv4 } from "uuid";
import { useEffect, type SetStateAction } from "react";
import useGetUserPlaylists from "@/hooks/useGetUserPlaylists";

type PlaylistPickerProps = {
	playlistId: string;
	setPlaylistId: (value: SetStateAction<string>) => void;
	accessToken: string;
};

const PlaylistPicker = ({
	playlistId,
	setPlaylistId,
	accessToken,
}: PlaylistPickerProps) => {
	const { userPlaylists, getUserPlaylists } = useGetUserPlaylists();

	useEffect(() => {
		if (accessToken) {
			getUserPlaylists(accessToken);
		}
	}, [accessToken]);

	return (
		<>
			<div className="flex flex-wrap gap-16">
				{userPlaylists.map((playlist) => {
					return (
						<div
							className="flex flex-col items-center gap-2 cursor-pointer"
							key={uuidv4()}
							onClick={() => setPlaylistId(playlist.id)}
						>
							{playlist.images.length && (
								<img src={playlist.images[0].url} width={200} height={200} />
							)}
							<span className="text-white font-bold text-xl">
								{playlist.name}
							</span>
						</div>
					);
				})}
			</div>

			<input
				className="text-black p-2 rounded-lg w-full"
				name="playlist-id"
				placeholder="Playlist ID"
				value={playlistId}
				onChange={(e) => setPlaylistId(e.target.value)}
			/>
		</>
	);
};

export default PlaylistPicker;
