import GetAllYouTubeVideos from '../../lib/youtube';

export default async (req, res) => {
  const allVideos = await GetAllYouTubeVideos();
  res.status(200).json({ allVideos });
};
