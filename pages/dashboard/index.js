import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import CreateChart from '../../components/apexchartlayout';
import { useEffect, useState } from 'react';

const updateDate = 'Dec 27, 2022';

function tsaDataChartOptions(data) {
  const tsaRawData = data;
  let tsaData = {};
  tsaData['data'] = [];
  for (let i = 0; i < 120; i++) {
    tsaData['data'].push(tsaRawData['data'][i]);
  }

  const tsaDataKeys = Object.keys(tsaData['data'][0]);
  let tsaChartRawData = {};

  for (let i = 0; i < tsaDataKeys.length; i++) {
    tsaChartRawData[tsaDataKeys[i]] = [];
    tsaChartRawData['gap'] = [];
    for (let y = 0; y < tsaData['data'].length; y++) {
      tsaChartRawData[tsaDataKeys[i]].unshift(tsaData['data'][y][tsaDataKeys[i]]);
      tsaChartRawData['gap'].unshift(100 - Math.round((tsaData['data'][y][2022] / tsaData['data'][y][2019]) * 100));
    }
  }

  const tsaChartData = [
    {
      name: '2019',
      data: tsaChartRawData['2019'],
    },
    {
      name: '2022',
      data: tsaChartRawData['2022'],
    },
    {
      name: 'Gap',
      data: tsaChartRawData['gap'],
    },
  ];

  const tsaChartOptions = {
    chart: {
      background: '#000',
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        top: 3,
        left: 0,
        blur: 1,
        color: '#333',
        opacity: 1,
      },
      toolbar: {
        show: false,
      },
      fontFamily: 'InterVariable, Roboto, Arial, sans-serif',
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
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
    grid: {
      borderColor: '#333',
      opacity: 0.1,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: ['#d90429', '#ffb300', '#dddddd'],
    fill: {
      type: 'solid',
      opacity: [1, 1, 0.2],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
    title: {
      text: 'TSA Passenger Data',
      align: 'center',
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    xaxis: {
      categories: tsaChartRawData['date'],
      labels: {
        rotate: -45,
        maxHeight: 60,
      },
      title: {
        text: 'Source: TSA, tsa.gov. Updated: ' + updateDate,
        align: 'center',
        offsetY: 100,
        style: {
          color: '#9C9C9C',
          fontSize: '10px',
          fontFamily: 'InterVariable, Roboto, sans-serif',
          fontWeight: 400,
        },
      },
      tickAmount: 18,
    },
    legend: {
      height: 35,
    },
    yaxis: [
      {
        seriesName: '2019',
        show: false,
        max: 3000000,
        min: 0,
        decimalsInFloat: 2,
        labels: {
          formatter: function (val, index) {
            return (val / 1000000).toFixed(1) + 'M';
          },
        },
      },
      {
        seriesName: '2022',
        show: true,
        max: 3000000,
        min: 0,
        decimalsInFloat: 0,
        labels: {
          formatter: function (val, index) {
            return (val / 1000000).toFixed(1) + 'M';
          },
        },
      },
      {
        opposite: true,
        seriesName: 'Gap',
        max: 100,
        min: -25,
        tickAmount: 10,
        title: {
          text: 'Gap',
          style: {
            fontWeight: 600,
          },
        },
        labels: {
          formatter: function (val, index) {
            return val + '%';
          },
        },
      },
    ],
    annotations: {
      position: 'back',
      yaxis: [
        {
          y: 0,
          y2: -50,
          yAxisIndex: 2,
          strokeDashArray: 0,
          borderColor: '#333',
          fillColor: '#ccc',
          opacity: 0.2,
          offsetX: 0,
          offsetY: 0,
        },
      ],
    },
  };
  return { tsaChartData, tsaChartOptions };
}

function strDataChartOptions(data) {
  const strData = data;
  const occChartData = [
    {
      name: '2019',
      data: strData['2019']['occupancy'],
    },
    {
      name: '2020',
      data: strData['2020']['occupancy'],
    },
    {
      name: '2021',
      data: strData['2021']['occupancy'],
    },
    {
      name: '2022',
      data: strData['2022']['occupancy'],
    },
  ];
  const ADRChartData = [
    {
      name: '2019',
      data: strData['2019']['ADR'],
    },
    {
      name: '2020',
      data: strData['2020']['ADR'],
    },
    {
      name: '2021',
      data: strData['2021']['ADR'],
    },
    {
      name: '2022',
      data: strData['2022']['ADR'],
    },
  ];
  const revPARChartData = [
    {
      name: '2019',
      data: strData['2019']['RevPAR'],
    },
    {
      name: '2020',
      data: strData['2020']['RevPAR'],
    },
    {
      name: '2021',
      data: strData['2021']['RevPAR'],
    },
    {
      name: '2022',
      data: strData['2022']['RevPAR'],
    },
  ];
  const occChartOptions = {
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
      toolbar: {
        show: false,
      },
      fontFamily: 'InterVariable, Roboto, Arial, sans-serif',
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: 'U.S. Hotel Occupancy (Weekly)',
      align: 'center',
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
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
      decimalsInFloat: 2,
    },
    legend: {
      height: 35,
    },
    xaxis: {
      categories: strData['2022']['date'],
      labels: {
        rotate: -45,
        maxHeight: 70,
      },
      title: {
        text: 'Source: STR, str.com. Updated: ' + updateDate,
        align: 'center',
        offsetX: -18,
        offsetY: 120,
        style: {
          color: '#9C9C9C',
          fontSize: '10px',
          fontFamily: 'InterVariable, Roboto, sans-serif',
          fontWeight: 400,
        },
      },
      tickAmount: 18,
    },
    colors: ['#d90429', '#dddddd', '#ffb300', '#0EB300'],
    fill: {
      type: 'solid',
      opacity: [1, 0.5, 1, 1],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
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
  };
  const ADRChartOptions = {
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
      toolbar: {
        show: false,
      },
      fontFamily: 'InterVariable, Roboto, Arial, sans-serif',
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: 'U.S. Hotel ADR (weekly)',
      align: 'center',
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
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
      decimalsInFloat: 2,
    },
    legend: {
      height: 35,
    },
    xaxis: {
      categories: strData['2022']['date'],
      labels: {
        rotate: -45,
        maxHeight: 70,
      },
      title: {
        text: 'Source: STR, str.com. Updated: ' + updateDate,
        align: 'center',
        offsetX: -18,
        offsetY: 120,
        style: {
          color: '#9C9C9C',
          fontSize: '10px',
          fontFamily: 'InterVariable, Roboto, sans-serif',
          fontWeight: 400,
        },
      },
      tickAmount: 18,
    },
    colors: ['#d90429', '#dddddd', '#ffb300', '#0EB300'],
    fill: {
      type: 'solid',
      opacity: [1, 0.5, 1, 1],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
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
  };
  const revPARChartOptions = {
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
      toolbar: {
        show: false,
      },
      fontFamily: 'InterVariable, Roboto, Arial, sans-serif',
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: 'U.S. Hotel RevPAR (weekly)',
      align: 'center',
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
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
      decimalsInFloat: 2,
    },
    legend: {
      height: 35,
    },
    xaxis: {
      categories: strData['2022']['date'],
      labels: {
        rotate: -45,
        maxHeight: 70,
      },
      title: {
        text: 'Source: STR, str.com. Updated: ' + updateDate,
        align: 'center',
        offsetX: -18,
        offsetY: 120,
        style: {
          color: '#9C9C9C',
          fontSize: '10px',
          fontFamily: 'InterVariable, Roboto, sans-serif',
          fontWeight: 400,
        },
      },
      tickAmount: 18,
    },
    colors: ['#d90429', '#dddddd', '#ffb300', '#0EB300'],
    fill: {
      type: 'solid',
      opacity: [1, 0.5, 1, 1],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
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
  };
  return { occChartData, ADRChartData, revPARChartData, occChartOptions, ADRChartOptions, revPARChartOptions };
}

export default function Dashboard() {
  const [strData, setStrData] = useState(null);
  const [tsaData, setTsaData] = useState(null);

  useEffect(() => {
    fetch('https://www.ilhandemirer.com/api/str')
      .then((res) => res.json())
      .then((data) => setStrData(data));
    fetch('https://www.ilhandemirer.com/api/tsa')
      .then((res) => res.json())
      .then((data) => setTsaData(data));
  }, []);

  if (!strData || !tsaData) {
    return (
      <Layout>
        <Head>
          <title>Hospitality Data Dashboard</title>
        </Head>
        <h2 className={utilStyles.headingLg}>U.S. Hospitality Data Dashboard</h2>
        <section>
          <h3>Please wait while data loads...</h3>
        </section>
      </Layout>
    );
  }
  const { occChartData, ADRChartData, revPARChartData, occChartOptions, ADRChartOptions, revPARChartOptions } =
    strDataChartOptions(strData);

  const { tsaChartData, tsaChartOptions } = tsaDataChartOptions(tsaData);

  return (
    <Layout>
      <Head>
        <title>Hospitality Data Dashboard</title>
      </Head>
      <h2 className={utilStyles.headingLg}>U.S. Hospitality Data Dashboard</h2>
      <section>
        <div>
          <h3>Occupancy Trends:</h3>
          <CreateChart data={occChartData} options={occChartOptions} type={'line'} height={500} />
        </div>
        <div>
          <h3>ADR Trends:</h3>
          <CreateChart data={ADRChartData} options={ADRChartOptions} type={'line'} height={500} />
        </div>
        <div>
          <h3>RevPAR Trends:</h3>
          <CreateChart data={revPARChartData} options={revPARChartOptions} type={'line'} height={500} />
        </div>
        <div>
          <h3>TSA Passenger Trends:</h3>
          <CreateChart data={tsaChartData} options={tsaChartOptions} type={'line'} height={500} />
        </div>
      </section>
    </Layout>
  );
}
