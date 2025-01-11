import axios from 'axios';

export async function getTwitchStatus() {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

  const twitchOAuth = await axios.post(url);
  const access_token = twitchOAuth.data.access_token;

  const searchURL = 'https://api.twitch.tv/helix/search/channels?query=impostorengineer';

  const searchData = await axios
    .get(searchURL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID,
      },
    })
    .then((response) => response.data);

  const channelFound = searchData.data.filter((c) => c.id == '158504554');
  const channelStatus = channelFound[0].is_live;
  return channelStatus;
}

export default async function handler(req, res) {
  const amILive = await getTwitchStatus();
  res.status(200).json({ amILive });
}
