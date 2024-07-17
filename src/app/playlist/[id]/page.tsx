const PlaylistStatsPage = async ({ params }: { params: { id: string } }) => {
  const { access_token } = (await (
    await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
    })
  ).json()) as { access_token: string };

  const data = await fetch(
    `https://api.spotify.com/v1/playlists/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  if (data.ok) {
    const json = (await data.json()) as unknown;
    console.log(json);
  } else {
    console.error("Error getting playlist data:", data.status, data.statusText);
  }

  return (
    <div>
      <p>{params.id}</p>
    </div>
  );
};

export default PlaylistStatsPage;
