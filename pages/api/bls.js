import axios from 'axios';

async function GetLaborStats() {
  const url = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 9;
  const laborStats = await axios.post(
    url,
    {
      seriesid: [
        'CES0000000001', // All Employees, Not Seasonally Adjusted
        'CES7000000001', // All Employees: Leisure and Hospitality, Not Seasonally Adjusted
        'CUSR0000SA0', // Consumer Price Index for All Urban Consumers: All Items in U.S. City Average, Seasonally Adjusted
        'CUUR0000SA0', // Consumer Price Index for All Urban Consumers: All Items in U.S. City Average, Not Seasonally Adjusted
        'CUSR0000SAF1', // Food in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SAF1', // Food in U.S. city average, all urban consumers, not seasonally adjusted
        'CUSR0000SAF11', // Food at home in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SAF11', // Food at home in U.S. city average, all urban consumers, not seasonally adjusted
        'CUSR0000SEFV', // Food away from home in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SEFV', // Food away from home in U.S. city average, all urban consumers, not seasonally adjusted
        'CUSR0000SA0E', // Energy in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SA0E', // Energy in U.S. city average, all urban consumers, not seasonally adjusted
        'CUSR0000SETB01', // Gasoline (all types) in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SETB01', // Gasoline (all types) in U.S. city average, all urban consumers, not seasonally adjusted
        'CUSR0000SETA01', // New vehicles in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SETA01', // New vehicles in U.S. city average, all urban consumers, not seasonally adjusted
        'CUSR0000SETA02', // Used cars and trucks in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SETA02', // Used cars and trucks in U.S. city average, all urban consumers, not seasonally adjusted
        'CUSR0000SEHA', // Rent of primary residence in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SEHA', // Rent of primary residence in U.S. city average, all urban consumers, not seasonally adjusted
        'CUSR0000SEHB', // Lodging away from home in U.S. city average, all urban consumers, seasonally adjusted
        'CUUR0000SEHB', // Lodging away from home in U.S. city average, all urban consumers, not seasonally adjusted
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
