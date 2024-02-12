import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import CreateChart from '../../components/apexchartlayout';
import { useEffect, useState } from 'react';

const updateDate = 'Jan 23, 2024';

function tsaDataChartOptions(data) {
  const tsaRawData = data;
  let tsaChartSourceData = tsaRawData['data'].slice(0, 90).reduce((obj, days) => {
    const years = ['2022', '2023', '2024', 'date'];
    for (let year = 0; year < years.length; year++) {
      if (!obj[years[year]]) {
        obj[years[year]] = [days[years[year]]];
      } else {
        if (!days[years[year]]) {
          obj[years[year]].unshift(0);
        } else {
          obj[years[year]].unshift(days[years[year]]);
        }
      }
    }
    return obj;
  }, {});

  tsaChartSourceData['gap'] = [];

  for (let i = 0; i < tsaChartSourceData['2024'].length; i++) {
    let gap = '';
    if (tsaChartSourceData['2024'][i] == 0) {
      gap = Math.round((tsaChartSourceData['2023'][i] / tsaChartSourceData['2022'][i] - 1) * 10000) / 100;
      tsaChartSourceData['gap'].push(gap);
    } else {
      gap = Math.round((tsaChartSourceData['2024'][i] / tsaChartSourceData['2023'][i] - 1) * 10000) / 100;
      tsaChartSourceData['gap'].push(gap);
    }
  }

  const tsaChartData = [
    {
      name: '2023',
      data: tsaChartSourceData['2023'],
    },
    {
      name: '2024',
      data: tsaChartSourceData['2024'],
    },
    {
      name: 'Gap',
      data: tsaChartSourceData['gap'],
    },
  ];

  const tsaChartOptions = {
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
        show: true,
      },
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      type: 'line',
      zoom: {
        enabled: true,
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
    colors: ['#404AE0', '#e67e22', '#dddddd'],
    fill: {
      type: 'solid',
      opacity: [1, 1, 0.2],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    title: {
      text: 'TSA Passenger Data',
      align: 'left',
      margin: 10,
      offsetX: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    subtitle: {
      text: 'Source: TSA, tsa.gov. Updated: ' + updateDate,
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
      categories: tsaChartSourceData['date'],
      labels: {
        rotate: -45,
        maxHeight: 45,
      },
      tickAmount: 21,
      tickPlacement: 'on',
    },
    legend: {
      height: 35,
    },
    yaxis: [
      {
        seriesName: '2023',
        show: true,
        max: 3000000,
        min: 750000,
        tickAmount: 9,
        decimalsInFloat: 2,
        labels: {
          formatter: function (val, index) {
            return (val / 1000000).toFixed(1) + 'M';
          },
        },
      },
      {
        seriesName: '2024',
        show: false,
        max: 3000000,
        min: 750000,
        tickAmount: 9,
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
        min: -20,
        tickAmount: 8,
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
          y2: -35,
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

  let strDataIndex = { occIndex: [], ADRIndex: [], date: [] };

  const indexedYears = ['2023', '2024'];

  for (let y = 0; y < indexedYears.length; y++) {
    strDataIndex['occIndex'].push(
      ...strData[indexedYears[y]]['occupancy'].map(
        (o, i) => Math.round((o / strData['2022']['occupancy'][i]) * 10000) / 100
      )
    );
    strDataIndex['ADRIndex'].push(
      ...strData[indexedYears[y]]['ADR'].map((a, i) => Math.round((a / strData['2022']['ADR'][i]) * 10000) / 100)
    );
    strDataIndex['date'].push(...strData[indexedYears[y]]['date']);
  }

  const strIndexChartData = [
    {
      name: 'ADR Index',
      data: strDataIndex['ADRIndex'],
    },
    {
      name: 'Occ Index',
      data: strDataIndex['occIndex'],
    },
  ];

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
    {
      name: '2023',
      data: strData['2023']['occupancy'],
    },
    {
      name: '2024',
      data: strData['2024']['occupancy'],
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
    {
      name: '2023',
      data: strData['2023']['ADR'],
    },
    {
      name: '2024',
      data: strData['2024']['ADR'],
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
    {
      name: '2023',
      data: strData['2023']['RevPAR'],
    },
    {
      name: '2024',
      data: strData['2024']['RevPAR'],
    },
  ];

  const mainChartOptions = {
    chart: {
      background: '#000',
      dropShadow: {
        enabled: true,
        enabledOnSeries: [5],
        top: 1,
        left: 1,
        blur: 0,
        color: '#000',
        opacity: 1,
      },
      toolbar: {
        show: true,
      },
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      type: 'line',
      zoom: {
        enabled: true,
      },
    },
    subtitle: {
      text: 'Source: STR, str.com. Updated: ' + updateDate,
      align: 'left',
      offsetX: 10,
      style: {
        color: '#9C9C9C',
        fontSize: '11px',
        fontFamily: 'Inter, Roboto, sans-serif',
        fontWeight: 400,
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
      categories: strData['2024']['date'],
      labels: {
        rotate: -45,
        maxHeight: 50,
        rotateAlways: true,
      },
      tickAmount: 18,
      tickPlacement: 'on',
    },
    colors: ['#d90429', '#dddddd', '#0EB300', '#404AE0', '#e67e22', '#FF6426'],
    fill: {
      type: 'solid',
      opacity: [0.25, 0.25, 0.25, 0.25, 0.25, 1],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
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
  const indexChartOptions = {
    title: {
      text: 'U.S. Hotel Occupancy and ADR Recovery Levels',
      align: 'left',
      margin: 10,
      offsetX: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    subtitle: {
      text: 'Indexed to 2019',
      align: 'left',
      offsetX: 10,
      offsetY: 30,
    },
    chart: {
      background: '#000',
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0, 1],
        top: 1,
        left: 1,
        blur: 0,
        color: '#000',
        opacity: 1,
      },
      toolbar: {
        show: true,
      },
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      type: 'line',
      zoom: {
        enabled: true,
      },
    },
    grid: {
      borderColor: '#333',
      opacity: 0.1,
      yaxis: {
        lines: {
          show: false,
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
      categories: strDataIndex['date'],
      labels: {
        rotate: -45,
        maxHeight: 50,
      },
      tickAmount: 21,
      tickPlacement: 'on',
    },
    colors: ['#0EB300', '#404AE0'],
    fill: {
      type: 'solid',
      opacity: [1, 1],
    },
    dataLabels: {
      enabled: false,
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
    annotations: {
      position: 'back',
      yaxis: [
        {
          y: 100,
          y2: 0,
          yAxisIndex: 0,
          strokeDashArray: 0,
          borderColor: '#333',
          fillColor: '#ccc',
          opacity: 0.1,
          offsetX: 0,
          offsetY: 0,
        },
      ],
      xaxis: [
        {
          x: '7-Jan',
          x2: 800,
          strokeDashArray: 0,
          borderColor: '#333',
          fillColor: '#ccc',
          opacity: 0.1,
          offsetX: 0,
          offsetY: 0,
          label: {
            text: '2023',
            textAnchor: 'middle',
            orientation: 'vertical',
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '11px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-xaxis-annotation-label',
            },
          },
        },
      ],
    },
  };
  const occChartOptions = {
    ...mainChartOptions,
    title: {
      text: 'U.S. Hotel Occupancy (Week Ending)',
      align: 'left',
      margin: 10,
      offsetX: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
  };
  const ADRChartOptions = {
    ...mainChartOptions,
    title: {
      text: 'U.S. Hotel ADR (Week Ending)',
      align: 'left',
      margin: 10,
      offsetX: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
  };
  const revPARChartOptions = {
    ...mainChartOptions,
    title: {
      text: 'U.S. Hotel RevPAR (Week Ending)',
      align: 'left',
      margin: 10,
      offsetX: 10,
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
  };

  return {
    strIndexChartData,
    occChartData,
    ADRChartData,
    revPARChartData,
    indexChartOptions,
    occChartOptions,
    ADRChartOptions,
    revPARChartOptions,
  };
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
  const {
    strIndexChartData,
    occChartData,
    ADRChartData,
    revPARChartData,
    indexChartOptions,
    occChartOptions,
    ADRChartOptions,
    revPARChartOptions,
  } = strDataChartOptions(strData);

  const { tsaChartData, tsaChartOptions } = tsaDataChartOptions(tsaData);

  return (
    <Layout>
      <Head>
        <title>Hospitality Data Dashboard</title>
      </Head>
      <h2 className={utilStyles.headingLg}>U.S. Hospitality Data Dashboard</h2>
      <section>
        <div>
          <h3>Recovery Index:</h3>
          <CreateChart data={strIndexChartData} options={indexChartOptions} type={'line'} height={500} />
        </div>
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
