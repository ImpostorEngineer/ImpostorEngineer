import axios from 'axios';

async function GetLaborStats() {
  const url = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 9;
  const laborStats = await axios.post(
    url,
    {
      seriesid: [
        'CES0000000001',
        'CES7000000001',
        'CUSR0000SA0',
        'CUUR0000SA0',
        'CUSR0000SAF1',
        'CUUR0000SAF1',
        'CUSR0000SAF11',
        'CUUR0000SAF11',
        'CUSR0000SEFV',
        'CUUR0000SEFV',
        'CUSR0000SA0E',
        'CUUR0000SA0E',
        'CUSR0000SETB01',
        'CUUR0000SETB01',
        'CUSR0000SETA01',
        'CUUR0000SETA01',
        'CUSR0000SETA02',
        'CUUR0000SETA02',
        'CUSR0000SEHA',
        'CUUR0000SEHA',
        'CUSR0000SEHB',
        'CUUR0000SEHB',
      ],
      startyear: startYear,
      endyear: currentYear,
      registrationkey: process.env.BLS_KEY,
    },
    { headers: { 'content-type': 'application/json' } }
  );
  return laborStats.data;
}

export default async function handler(req, res) {
  const laborStats = await GetLaborStats();
  res.status(200).json(laborStats);
}
//
