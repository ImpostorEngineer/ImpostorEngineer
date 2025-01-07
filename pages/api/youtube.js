// import GetAllYouTubeVideos from '../../app/utils/youtube';

// export default async (req, res) => {
//   const allVideos = await GetAllYouTubeVideos();
//   res.status(200).json({ allVideos });
// };

export default function handler(req, res) {
  res.status(200).json({ hello: 'hello world' });
}
