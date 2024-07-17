import PlaylistSearch from "~/components/PlaylistSearch";

const HomePage = () => {
  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Spotify Playlist Stats
      </h1>
      <PlaylistSearch />
    </>
  );
};

export default HomePage;
