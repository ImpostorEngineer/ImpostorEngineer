import axios from 'axios';

const GetAllYouTubeVideos = async () => {
  const channelID = 'UC-cAQFgdTrl4B00qz87zGVg';
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=50&type=video&key=${process.env.YOUTUBE_API_KEY}`;
  const data = await axios.get(url);
  return data.data;
};

export default GetAllYouTubeVideos;
