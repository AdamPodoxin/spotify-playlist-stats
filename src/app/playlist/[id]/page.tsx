const PlaylistStatsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <p>{params.id}</p>
    </div>
  );
};

export default PlaylistStatsPage;
