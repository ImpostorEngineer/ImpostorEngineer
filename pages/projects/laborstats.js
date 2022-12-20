import Head from 'next/head';
import Layout from '../../components/layout';
import secStyles from '../../components/SECFilings.module.css';
import utilStyles from '../../styles/utils.module.css';
import CreateChart from '../../components/apexchartlayout';
import { useEffect, useState } from 'react';

function createDataArray(data) {
  let dateData = [];
  let employmentData = [];
  let hospitalityEmploymentData = [];

  const seriesData = data.Results.series;

  for (let i = 0; i < seriesData[0].data.length; i++) {
    employmentData.unshift(seriesData[0].data[i].value);
    dateData.unshift(seriesData[0].data[i].year + '-' + seriesData[0].data[i].period);
  }
  for (let i = 0; i < seriesData[1].data.length; i++) {
    hospitalityEmploymentData.unshift(seriesData[1].data[i].value);
  }

  const finalData = { dateData, employmentData, hospitalityEmploymentData };
  return finalData;
}

function percentChange(data) {
  let dateData = [];
  let employmentData = [];
  let hospitalityEmploymentData = [];
  const seriesData = data.Results.series;
  for (let i = 35; i < seriesData[0].data.length; i++) {
    employmentData.unshift((seriesData[0].data[i - 35].value / seriesData[0].data[i].value - 1) * 100);
    dateData.unshift(seriesData[0].data[i - 35].year + '-' + seriesData[0].data[i - 35].period);
  }
  for (let i = 35; i < seriesData[1].data.length; i++) {
    hospitalityEmploymentData.unshift((seriesData[1].data[i - 35].value / seriesData[1].data[i].value - 1) * 100);
  }
  const finalData = { dateData, employmentData, hospitalityEmploymentData };
  return finalData;
}

function laborDataChartOptions(laborData) {
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
      fontFamily: 'InterVariable, Roboto, Arial, sans-serif',
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
      curve: 'straight',
      width: 3,
    },
    title: {
      text: 'U.S. Employment',
      align: 'center',
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    xaxis: {
      categories: laborData.dateData,
      labels: {
        rotate: -45,
        maxHeight: 80,
      },
      title: {
        text: 'Source: BLS',
        offsetX: -18,
        offsetY: 140,
        style: {
          color: '#9C9C9C',
          fontSize: '10px',
          fontFamily: 'InterVariable, Roboto, sans-serif',
          fontWeight: 400,
        },
      },
      tickAmount: 15,
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

function percentDataChartOptions(laborData) {
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
      fontFamily: 'InterVariable, Roboto, Arial, sans-serif',
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
      curve: 'straight',
      width: 3,
    },
    title: {
      text: 'U.S. Employment vs 36 month prior % Change',
      align: 'center',
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    xaxis: {
      categories: laborData.dateData,
      labels: {
        rotate: -45,
        maxHeight: 80,
      },
      title: {
        text: 'Source: BLS',
        offsetX: -18,
        offsetY: 140,
        style: {
          color: '#9C9C9C',
          fontSize: '10px',
          fontFamily: 'InterVariable, Roboto, sans-serif',
          fontWeight: 400,
        },
      },
      tickAmount: 15,
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

  const { laborChartData, laborChartOptions } = laborDataChartOptions(createDataArray(laborData));

  const { percentLaborChartData, percentLaborChartOptions } = percentDataChartOptions(percentChange(laborData));

  return (
    <Layout>
      <Head>
        <title>U.S. Employment Data</title>
      </Head>
      <h2 className={utilStyles.headingLg}>U.S. Employment Data</h2>
      <section>
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
