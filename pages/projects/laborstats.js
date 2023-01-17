import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import CreateChart from '../../components/apexchartlayout';
import { useEffect, useState } from 'react';

function createLaborDataArray(data) {
  let dateData = [];
  let employmentData = [];
  let hospitalityEmploymentData = [];

  const employmentRawData = data.Results.series.filter((s) => s.seriesID == 'CES0000000001')[0];
  const hospitalityEmploymentRawData = data.Results.series.filter((s) => s.seriesID == 'CES7000000001')[0];

  for (let i = 0; i < employmentRawData.data.length; i++) {
    employmentData.unshift(employmentRawData.data[i].value);
    dateData.unshift(employmentRawData.data[i].year + '-' + employmentRawData.data[i].periodName.slice(0, 3));
  }
  for (let i = 0; i < hospitalityEmploymentRawData.data.length; i++) {
    hospitalityEmploymentData.unshift(hospitalityEmploymentRawData.data[i].value);
  }

  const finalData = { dateData, employmentData, hospitalityEmploymentData };
  return finalData;
}

function percentChange(data) {
  let dateData = [];
  let employmentData = [];
  let hospitalityEmploymentData = [];

  const employmentRawData = data.Results.series.filter((s) => s.seriesID == 'CES0000000001')[0];
  const hospitalityEmploymentRawData = data.Results.series.filter((s) => s.seriesID == 'CES7000000001')[0];

  for (let i = 35; i < employmentRawData.data.length; i++) {
    employmentData.unshift((employmentRawData.data[i - 35].value / employmentRawData.data[i].value - 1) * 100);
    dateData.unshift(employmentRawData.data[i - 35].year + '-' + employmentRawData.data[i - 35].periodName.slice(0, 3));
  }
  for (let i = 35; i < hospitalityEmploymentRawData.data.length; i++) {
    hospitalityEmploymentData.unshift(
      (hospitalityEmploymentRawData.data[i - 35].value / hospitalityEmploymentRawData.data[i].value - 1) * 100
    );
  }
  const finalData = { dateData, employmentData, hospitalityEmploymentData };
  return finalData;
}

function monthlyPercentChange(series) {
  const percentChange = series.data.reduce((obj, month, i) => {
    const previousMonth = series.data[i + 1];
    if (!obj['date']) {
      obj['date'] = [`${month['year']}-${month['periodName'].slice(0, 3)}`];
    } else {
      obj['date'].unshift(`${month['year']}-${month['periodName'].slice(0, 3)}`);
    }
    if (!obj['change']) {
      obj['change'] = [Math.round((month['value'] / previousMonth['value'] - 1) * 1000) / 10];
    } else {
      if (!previousMonth) {
        obj['change'].unshift(0);
      } else {
        obj['change'].unshift(Math.round((month['value'] / previousMonth['value'] - 1) * 1000) / 10);
      }
    }
    return obj;
  }, {});
  return percentChange;
}

function twelveMonthPercentChange(series) {
  const twelveMonthChange = series.data.reduce((obj, month, i) => {
    const twelveMonths = series.data[i + 12];
    if (!obj['twelveMonthChange']) {
      obj['twelveMonthChange'] = [Math.round((month['value'] / twelveMonths['value'] - 1) * 1000) / 10];
    } else {
      if (!twelveMonths) {
        obj['twelveMonthChange'].unshift(0);
      } else {
        obj['twelveMonthChange'].unshift(Math.round((month['value'] / twelveMonths['value'] - 1) * 1000) / 10);
      }
    }
    return obj;
  }, {});
  return twelveMonthChange;
}

function createCPIData(data) {
  const cpiRawData = data.Results.series.filter((s) => s.seriesID == 'CUSR0000SA0')[0];
  const cpiUnAdjustedRawData = data.Results.series.filter((s) => s.seriesID == 'CUUR0000SA0')[0];
  let cpiChartData = cpiRawData.data.reduce((obj, month, i) => {
    const previousMonth = cpiRawData.data[i + 1];
    if (!obj['date']) {
      obj['date'] = [`${month['year']}-${month['periodName'].slice(0, 3)}`];
    } else {
      obj['date'].unshift(`${month['year']}-${month['periodName'].slice(0, 3)}`);
    }
    if (!obj['cpiValue']) {
      obj['cpiValue'] = [+month['value']];
    } else {
      obj['cpiValue'].unshift(+month['value']);
    }
    if (!obj['change']) {
      obj['change'] = [Math.round((month['value'] / previousMonth['value'] - 1) * 1000) / 10];
    } else {
      if (!previousMonth) {
        obj['change'].unshift(0);
      } else {
        obj['change'].unshift(Math.round((month['value'] / previousMonth['value'] - 1) * 1000) / 10);
      }
    }
    return obj;
  }, {});

  const cpiUnAdjustedTwelveMonthChange = cpiUnAdjustedRawData.data.reduce((obj, month, i) => {
    const twelveMonths = cpiUnAdjustedRawData.data[i + 12];
    if (!obj['twelveMonthChange']) {
      obj['twelveMonthChange'] = [Math.round((month['value'] / twelveMonths['value'] - 1) * 1000) / 10];
    } else {
      if (!twelveMonths) {
        obj['twelveMonthChange'].unshift(0);
      } else {
        obj['twelveMonthChange'].unshift(Math.round((month['value'] / twelveMonths['value'] - 1) * 1000) / 10);
      }
    }
    return obj;
  }, {});

  cpiChartData['twelveMonthChange'] = cpiUnAdjustedTwelveMonthChange['twelveMonthChange'];

  return cpiChartData;
}

function laborDataChartOptions(data) {
  const laborData = createLaborDataArray(data);

  const laborChartData = [
    {
      name: 'Total Employment',
      data: laborData.employmentData,
    },
    {
      name: 'Leisure & Hospitality',
      data: laborData.hospitalityEmploymentData,
    },
  ];

  const laborChartOptions = {
    theme: {
      mode: 'dark',
      palette: 'palette6',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65,
      },
    },
    chart: {
      background: '#000',
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        top: 1,
        left: 1,
        blur: 0,
        color: '#000',
        opacity: 1,
      },
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      height: 400,
      width: 800,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    colors: ['#d90429', '#ffc300'],
    fill: {
      type: 'solid',
      opacity: [1, 1],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'U.S. Employment',
      align: 'left',
      offsetX: 10,
      margin: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    subtitle: {
      text: 'Source: BLS',
      align: 'left',
      offsetX: 10,
      style: {
        color: '#9C9C9C',
        fontSize: '11px',
        fontFamily: 'Inter, Roboto, sans-serif',
        fontWeight: 400,
      },
    },
    xaxis: {
      categories: laborData.dateData,
      labels: {
        rotate: -45,
        maxHeight: 80,
      },
      tickAmount: 15,
    },
    grid: {
      borderColor: '#333',
      opacity: 0.1,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: [
      {
        seriesName: 'Total Employment',
        forceNiceScale: true,
        decimalsInFloat: 0,
        labels: {
          formatter: function (val, index) {
            return (val / 1000).toFixed(1) + 'M';
          },
        },
      },
      {
        opposite: true,
        seriesName: 'Leisure & Hospitality',
        forceNiceScale: true,
        decimalsInFloat: 0,
        labels: {
          formatter: function (val, index) {
            return (val / 100).toFixed(1) + 'T';
          },
        },
      },
    ],
  };
  return { laborChartData, laborChartOptions };
}

function percentDataChartOptions(data) {
  const laborData = percentChange(data);
  const percentLaborChartData = [
    {
      name: 'Total Employment',
      data: laborData.employmentData,
    },
    {
      name: 'Leisure & Hospitality',
      data: laborData.hospitalityEmploymentData,
    },
  ];

  const percentLaborChartOptions = {
    theme: {
      mode: 'dark',
      palette: 'palette6',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65,
      },
    },
    chart: {
      background: '#000',
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        top: 1,
        left: 1,
        blur: 0,
        color: '#000',
        opacity: 1,
      },
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      height: 400,
      width: 800,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    colors: ['#d90429', '#ffc300'],
    fill: {
      type: 'solid',
      opacity: [1, 1],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'U.S. Employment vs 36 month prior % Change',
      align: 'left',
      offsetX: 10,
      margin: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    subtitle: {
      text: 'Source: BLS',
      align: 'left',
      offsetX: 10,
      style: {
        color: '#9C9C9C',
        fontSize: '11px',
        fontFamily: 'Inter, Roboto, sans-serif',
        fontWeight: 400,
      },
    },
    xaxis: {
      categories: laborData.dateData,
      labels: {
        rotate: -45,
        maxHeight: 80,
      },
      tickAmount: 15,
    },
    grid: {
      borderColor: '#333',
      opacity: 0.1,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: [
      {
        seriesName: 'Total Employment',
        forceNiceScale: true,
        decimalsInFloat: 2,
        labels: {
          formatter: function (val, index) {
            return val.toFixed(1) + '%';
          },
        },
      },
      {
        opposite: true,
        seriesName: 'Leisure & Hospitality',
        forceNiceScale: true,
        decimalsInFloat: 2,
        labels: {
          formatter: function (val, index) {
            return val.toFixed(1) + '%';
          },
        },
      },
    ],
  };
  return { percentLaborChartData, percentLaborChartOptions };
}

function cpiDataChartOptions(data) {
  const cpiData = createCPIData(data);

  const cpiChartData = [
    {
      name: 'CPI',
      data: cpiData['cpiValue'],
    },
    {
      name: '% Change, Seasonally Adjusted',
      data: cpiData['change'],
    },
    {
      name: '12-Month % Change, Not Seasonally Adjusted',
      data: cpiData['twelveMonthChange'],
    },
  ];

  const cpiChartOptions = {
    theme: {
      mode: 'dark',
      palette: 'palette6',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65,
      },
    },
    chart: {
      background: '#000',
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        top: 1,
        left: 1,
        blur: 0,
        color: '#000',
        opacity: 1,
      },
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      height: 400,
      width: 800,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    colors: ['#d90429', '#ffc300', '#0EB300'],
    fill: {
      type: 'solid',
      opacity: [1, 1],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'Consumer Price Index',
      align: 'left',
      offsetX: 10,
      margin: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    subtitle: {
      text: 'Source: BLS',
      align: 'left',
      offsetX: 10,
      style: {
        color: '#9C9C9C',
        fontSize: '11px',
        fontFamily: 'Inter, Roboto, sans-serif',
        fontWeight: 400,
      },
    },
    legend: {
      show: true,
      fontSize: '10px',
      offsetY: -5,
    },
    xaxis: {
      categories: cpiData['date'],
      labels: {
        rotate: -45,
        maxHeight: 80,
      },
      tickAmount: 15,
    },
    grid: {
      borderColor: '#333',
      opacity: 0.1,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: [
      {
        seriesName: 'CPI',
        show: true,
        forceNiceScale: true,
        decimalsInFloat: 2,
        tickAmount: 8,
      },
      {
        opposite: true,
        show: true,
        min: -2,
        max: 10,
        seriesName: '% Change',
        forceNiceScale: true,
        decimalsInFloat: 2,
      },
      {
        opposite: true,
        show: false,
        min: -2,
        max: 10,
        seriesName: '12 Month % Change',
        forceNiceScale: true,
        decimalsInFloat: 2,
      },
    ],
  };
  return { cpiChartData, cpiChartOptions };
}

function cpiComponentsChart(data) {
  const foodAdjusted = monthlyPercentChange(data.Results.series.filter((s) => s.seriesID == 'CUSR0000SAF1')[0]);
  const foodNotAdjusted = twelveMonthPercentChange(data.Results.series.filter((s) => s.seriesID == 'CUUR0000SAF1')[0]);
  const foodAtHomeNotAdjusted = twelveMonthPercentChange(
    data.Results.series.filter((s) => s.seriesID == 'CUUR0000SAF11')[0]
  );
  const foodAwayNotAdjusted = twelveMonthPercentChange(
    data.Results.series.filter((s) => s.seriesID == 'CUUR0000SEFV')[0]
  );
  const energyNotAdjusted = twelveMonthPercentChange(
    data.Results.series.filter((s) => s.seriesID == 'CUUR0000SA0E')[0]
  );
  const gasolineNotAdjusted = twelveMonthPercentChange(
    data.Results.series.filter((s) => s.seriesID == 'CUUR0000SETB01')[0]
  );
  const newVehiclesNotAdjusted = twelveMonthPercentChange(
    data.Results.series.filter((s) => s.seriesID == 'CUUR0000SETA01')[0]
  );
  const usedCarsNotAdjusted = twelveMonthPercentChange(
    data.Results.series.filter((s) => s.seriesID == 'CUUR0000SETA02')[0]
  );
  const rentNotAdjusted = twelveMonthPercentChange(data.Results.series.filter((s) => s.seriesID == 'CUUR0000SEHA')[0]);
  const lodgingNotAdjusted = twelveMonthPercentChange(
    data.Results.series.filter((s) => s.seriesID == 'CUUR0000SEHB')[0]
  );
  const cpiPartsChartData = [
    { name: 'Food', data: foodNotAdjusted.twelveMonthChange.slice(12) },
    { name: 'Food at Home', data: foodAtHomeNotAdjusted.twelveMonthChange.slice(12) },
    { name: 'Food Away from Home', data: foodAwayNotAdjusted.twelveMonthChange.slice(12) },
    { name: 'Energy', data: energyNotAdjusted.twelveMonthChange.slice(12) },
    { name: 'Gasoline', data: gasolineNotAdjusted.twelveMonthChange.slice(12) },
    { name: 'New Vehicles', data: newVehiclesNotAdjusted.twelveMonthChange.slice(12) },
    { name: 'Used Cars and Trucks', data: usedCarsNotAdjusted.twelveMonthChange.slice(12) },
    { name: 'Rent', data: rentNotAdjusted.twelveMonthChange.slice(12) },
    { name: 'Lodging', data: lodgingNotAdjusted.twelveMonthChange.slice(12) },
  ];

  const cpiPartsChartOptions = {
    theme: {
      mode: 'dark',
      palette: 'palette6',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65,
      },
    },
    chart: {
      background: '#000',
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 0,
        color: '#000',
        opacity: 1,
      },
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      height: 600,
      width: 800,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    colors: ['#FFFF00', '#008080', '#0000FF', '#800000', '#0EB300', '#C0C0C0', '#4cc9f0', '#AE2012', '#FF00FF'],
    fill: {
      type: 'solid',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'Percent changes in CPI for All Urban Consumers: U.S. city average',
      align: 'left',
      offsetX: 10,
      margin: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    subtitle: {
      text: 'Not Seasonally Adjusted, Source: BLS',
      align: 'left',
      offsetX: 10,
      style: {
        color: '#9C9C9C',
        fontSize: '11px',
        fontFamily: 'Inter, Roboto, sans-serif',
        fontWeight: 400,
      },
    },
    legend: {
      show: true,
      fontSize: '10px',
      offsetY: -5,
    },
    xaxis: {
      categories: foodAdjusted.date.slice(12),
      labels: {
        rotate: -45,
        maxHeight: 70,
      },
      tickAmount: 15,
    },
    grid: {
      borderColor: '#333',
      opacity: 0.1,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      show: true,
      decimalsInFloat: 2,
      tickAmount: 8,
    },
  };
  return { cpiPartsChartData, cpiPartsChartOptions };
}

export default function LaborStats() {
  const [laborData, setLaborData] = useState(null);

  useEffect(() => {
    fetch('/api/bls')
      .then((res) => res.json())
      .then((data) => setLaborData(data));
  }, []);

  if (!laborData) {
    return (
      <Layout>
        <Head>
          <title>U.S. Employment Data</title>
        </Head>
        <h2 className={utilStyles.headingLg}>U.S. Employment Data</h2>
        <section>
          <h3>Please wait while data loads...</h3>
        </section>
      </Layout>
    );
  }

  const { laborChartData, laborChartOptions } = laborDataChartOptions(laborData);

  const { percentLaborChartData, percentLaborChartOptions } = percentDataChartOptions(laborData);

  const { cpiChartData, cpiChartOptions } = cpiDataChartOptions(laborData);

  const { cpiPartsChartData, cpiPartsChartOptions } = cpiComponentsChart(laborData);

  return (
    <Layout>
      <Head>
        <title>U.S. Economic Data</title>
      </Head>
      <h2 className={utilStyles.headingLg}>U.S. Economic Data</h2>
      <section>
        <div>
          <h3>Consumer Price Index for All Urban Consumers: U.S. City Average</h3>
          <CreateChart data={cpiChartData} options={cpiChartOptions} type={'line'} height={500} />
        </div>
        <div>
          <h3>Percent changes in CPI for All Urban Consumers: U.S. City Average</h3>
          <CreateChart data={cpiPartsChartData} options={cpiPartsChartOptions} type={'line'} height={500} />
        </div>
        <div>
          <h3>Current Employment Numbers:</h3>
          <CreateChart data={laborChartData} options={laborChartOptions} type={'line'} height={500} />
        </div>
        <div>
          <h3>Percentage Change from 36 months prior:</h3>
          <CreateChart data={percentLaborChartData} options={percentLaborChartOptions} type={'line'} height={500} />
        </div>
      </section>
    </Layout>
  );
}
