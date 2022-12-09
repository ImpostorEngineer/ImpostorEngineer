import axios from 'axios';

async function GetLaborStats() {
  const url = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
  const laborStats = await axios.post(
    url,
    {
      seriesid: ['CES0000000001', 'CES7000000001'],
      startyear: '2015',
      endyear: '2022',
      registrationkey: process.env.BLS_KEY,
    },
    { headers: { 'content-type': 'application/json' } }
  );
  return laborStats.data;
}

export default async (req, res) => {
  const laborStats = await GetLaborStats();
  res.status(200).json(laborStats);
};
