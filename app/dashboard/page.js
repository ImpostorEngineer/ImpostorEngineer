'use client';
import dynamic from 'next/dynamic';
import { useTheme } from '../../context/ThemeContext';
import strRawData from '../../assets/data/strdata.json';
import tsaRawData from '../../assets/data/passengerData.json';

export default function Dashboard() {
  const Chart = dynamic(() => import('react-apexcharts').then((mod) => mod.default), { ssr: false });
  const { theme } = useTheme();

  const updateDate = 'Jan 30, 2026';

  const today = new Date();
  const beginning = new Date('2026-01-01');
  const diffMs = today - beginning;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)) - 1;

  function tsaDataChartOptions(data) {
    const tsaRawData = data;
    let tsaChartSourceData = tsaRawData['data'].slice(0, diffDays).reduce((obj, days) => {
      const years = ['2024', '2025', '2026', 'date'];
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

    for (let i = 0; i < tsaChartSourceData['2026'].length; i++) {
      let gap = '';
      if (tsaChartSourceData['2026'][i] == 0) {
        gap = Math.round((tsaChartSourceData['2025'][i] / tsaChartSourceData['2024'][i] - 1) * 10000) / 100;
        tsaChartSourceData['gap'].push(gap);
      } else {
        gap = Math.round((tsaChartSourceData['2026'][i] / tsaChartSourceData['2025'][i] - 1) * 10000) / 100;
        tsaChartSourceData['gap'].push(gap);
      }
    }

    const tsaChartData = [
      {
        name: '2025',
        data: tsaChartSourceData['2025'],
      },
      {
        name: '2026',
        data: tsaChartSourceData['2026'],
      },
      {
        name: 'Gap',
        data: tsaChartSourceData['gap'],
      },
    ];

    const tsaChartMax = Math.ceil((Math.max(...tsaChartSourceData['2026']) + 100000) / 10) * 10;
    const tsaChartMin = Math.floor((Math.min(...tsaChartSourceData['2026']) - 100000) / 10) * 10;
    const tsaChartMaxGap = Math.ceil((Math.max(...tsaChartSourceData['gap']) + 5) / 10) * 10;
    const tsaChartMinGap = Math.floor((Math.min(...tsaChartSourceData['gap']) - 5) / 10) * 10;
    const tsaChartTickAmount = -(tsaChartMinGap - tsaChartMaxGap) / 10;

    const tsaChartOptions = {
      chart: {
        dropShadow: {
          enabled: true,
          enabledOnSeries: [0, 1],
          top: 1,
          left: 1,
          blur: 0,
          color: '#000',
          opacity: 0.5,
        },
        toolbar: {
          show: false,
        },
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        type: 'line',
        zoom: {
          enabled: true,
        },
      },
      theme: {
        mode: theme,
        palette: 'palette6',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
      grid: {
        borderColor: '#ececec',
        opacity: 0.1,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: ['#4580ff', '#d25b00', '#b8b8b8'],
      fill: {
        type: 'solid',
        opacity: [0.5, 1, 0.7],
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
          seriesName: '2025',
          show: false,
          max: tsaChartMax,
          min: tsaChartMin,
          tickAmount: 9,
          decimalsInFloat: 2,
          labels: {
            formatter: function (val, index) {
              return (val / 1000000).toFixed(1) + 'M';
            },
          },
        },
        {
          seriesName: '2026',
          show: true,
          showAlways: true,
          max: tsaChartMax,
          min: tsaChartMin,
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
          max: tsaChartMaxGap,
          min: tsaChartMinGap,
          tickAmount: tsaChartTickAmount,
          title: {
            text: 'Gap (Positive is better)',
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
        // position: 'back',
        // yaxis: [
        //   {
        //     y: 0,
        //     y2: tsaChartMinGap,
        //     yAxisIndex: 2,
        //     strokeDashArray: [5, 5],
        //     borderColor: '#000',
        //     // fillColor: '#eee',
        //     opacity: 0.05,
        //     offsetX: 0,
        //     offsetY: 0,
        //   },
        // ],
        //   xaxis: [
        //     {
        //       x: '1/1/2026',
        //       x2: tsaChartMaxDate,
        //       yAxisIndex: 2,
        //       strokeDashArray: 0,
        //       borderColor: '#333',
        //       fillColor: '#ccc',
        //       opacity: 0.2,
        //       offsetX: 0,
        //       offsetY: 0,
        //       label: {
        //         text: '2026',
        //         textAnchor: 'middle',
        //         orientation: 'vertical',
        //         style: {
        //           background: '#fff',
        //           color: '#777',
        //           fontSize: '11px',
        //           fontWeight: 400,
        //           fontFamily: undefined,
        //           cssClass: 'apexcharts-xaxis-annotation-label',
        //         },
        //       },
        //     },
        //   ],
      },
    };
    return { tsaChartData, tsaChartOptions };
  }

  function strDataChartOptions(data) {
    let years = [];
    let opacityVals = [];
    for (let i in data) {
      years.push(i);
      opacityVals.push(0.4);
    }
    opacityVals.pop();
    opacityVals.push(1);

    const maxYear = Math.max(...years).toString();

    let strData = {};
    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      strData[year] = {};
      strData[year]['occupancy'] = data[year].map((o) => o.occupancy);
      strData[year]['ADR'] = data[year].map((o) => o.ADR);
      strData[year]['RevPAR'] = data[year].map((o) => o.RevPAR);
      strData[year]['date'] = data[year].map((o) => o.date);
      strData[year]['week'] = data[year].map((o) => o.week);
    }

    const strDataIndex = { occIndex: [], ADRIndex: [], date: [] };
    const strDataOcc = [];
    const strDataADR = [];
    const strDataDate = [];

    const indexedYears = ['2024', '2025', '2026'];
    for (let y = 0; y < indexedYears.length; y++) {
      strDataOcc.push(...strData[indexedYears[y]]['occupancy']);
      strDataADR.push(...strData[indexedYears[y]]['ADR']);
      strDataDate.push(...strData[indexedYears[y]]['date']);
    }

    strDataIndex['occIndex'].push(
      ...strDataOcc.slice(52).map((o, i) => {
        return Math.round((o / strDataOcc[i]) * 10000) / 100;
      }),
    );
    strDataIndex['ADRIndex'].push(
      ...strDataADR.slice(52).map((o, i) => {
        return Math.round((o / strDataADR[i]) * 10000) / 100;
      }),
    );
    strDataIndex['date'].push(...strDataDate.slice(52));

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
        name: '2017',
        data: strData['2017']['occupancy'],
      },
      {
        name: '2018',
        data: strData['2018']['occupancy'],
      },
      {
        name: '2019',
        data: strData['2019']['occupancy'],
      },
      {
        name: '2020',
        data: strData['2020']['occupancy'].slice(0, 52),
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
      {
        name: '2025',
        data: strData['2025']['occupancy'].slice(0, 52),
      },
      {
        name: '2026',
        data: strData['2026']['occupancy'],
      },
    ];

    const ADRChartData = [
      {
        name: '2017',
        data: strData['2017']['ADR'],
      },
      {
        name: '2018',
        data: strData['2018']['ADR'],
      },
      {
        name: '2019',
        data: strData['2019']['ADR'],
      },
      {
        name: '2020',
        data: strData['2020']['ADR'].slice(0, 52),
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
      {
        name: '2025',
        data: strData['2025']['ADR'].slice(0, 52),
      },
      {
        name: '2026',
        data: strData['2026']['ADR'],
      },
    ];

    const revPARChartData = [
      {
        name: '2017',
        data: strData['2017']['RevPAR'],
      },
      {
        name: '2018',
        data: strData['2018']['RevPAR'],
      },
      {
        name: '2019',
        data: strData['2019']['RevPAR'],
      },
      {
        name: '2020',
        data: strData['2020']['RevPAR'].slice(0, 52),
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
      {
        name: '2025',
        data: strData['2025']['RevPAR'].slice(0, 52),
      },
      {
        name: '2026',
        data: strData['2026']['RevPAR'],
      },
    ];

    const mainChartOptions = {
      chart: {
        dropShadow: {
          enabled: true,
          enabledOnSeries: [9],
          top: 1,
          left: 1,
          blur: 0,
          color: '#000',
          opacity: 1,
        },
        toolbar: {
          show: false,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
          },
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
        borderColor: '#ccc',
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
        height: 50,
      },
      xaxis: {
        categories: strData[maxYear]['date'],
        labels: {
          rotate: -45,
          maxHeight: 50,
          rotateAlways: true,
        },
        tickAmount: 18,
        tickPlacement: 'on',
      },
      // colors: ['#c39bd3', '#a8a8a8', '#6bfbec', '#dddddd', '#0EB300', '#404AE0', '#e67e22', '#FF5733'],
      fill: {
        type: 'solid',
        opacity: [...opacityVals],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      theme: {
        mode: theme,
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
        text: 'U.S. Hotel Occupancy and ADR Index',
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
        text: 'Index YOY, Source: STR, str.com',
        align: 'left',
        offsetX: 10,
        offsetY: 30,
        style: {
          color: '#9C9C9C',
          fontSize: '12px',
          fontFamily: 'Inter, Roboto, sans-serif',
          fontWeight: 400,
        },
      },
      chart: {
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
          show: false,
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
        min: 85,
        max: 125,
        tickAmount: 8,
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
        tickAmount: 25,
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
        mode: theme,
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
            x: '1/3/2026',
            x2: '1/2/2027',
            strokeDashArray: 0,
            borderColor: '#333',
            fillColor: '#ccc',
            opacity: 0.1,
            offsetX: 0,
            offsetY: 0,
            label: {
              text: '2026',
              textAnchor: 'middle',
              orientation: 'vertical',
              style: {
                background: '#fff',
                color: '#777',
                fontSize: '11px',
                fontWeight: 400,
                fontFamily: 'sans-serif',
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
      yaxis: {
        min: 20,
        max: 80,
        tickAmount: 6,
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
      yaxis: {
        min: 60,
        max: 180,
        tickAmount: 6,
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
      yaxis: {
        max: 130,
        min: 0,
        tickAmount: 5,
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

  // const [strRawData, setStrRawData] = useState(null);
  // const [tsaRawData, setTsaRawData] = useState(null);

  // useEffect(() => {
  //   fetch('https://www.ilhandemirer.com/api/str')
  //     .then((res) => res.json())
  //     .then((data) => setStrRawData(data));
  //   fetch('https://www.ilhandemirer.com/api/tsa')
  //     .then((res) => res.json())
  //     .then((data) => setTsaRawData(data));
  // }, []);

  if (!strRawData || !strRawData) {
    return (
      <div>
        <h2>U.S. Hospitality Data Dashboard</h2>
        <section>
          <h3>Please wait while data loads...</h3>
        </section>
      </div>
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
  } = strDataChartOptions(strRawData);

  const { tsaChartData, tsaChartOptions } = tsaDataChartOptions(tsaRawData);

  return (
    <div>
      <h2>U.S. Hospitality Data Dashboard</h2>
      <section>
        <div>
          <h3>Recovery Index:</h3>
          <Chart series={strIndexChartData} options={indexChartOptions} height={500} className='drop-shadow-lg' />
        </div>
        <div>
          <h3>Occupancy Trends:</h3>
          <Chart series={occChartData} options={occChartOptions} height={500} className='drop-shadow-lg' />
        </div>
        <div>
          <h3>ADR Trends:</h3>
          <Chart series={ADRChartData} options={ADRChartOptions} height={500} className='drop-shadow-lg' />
        </div>
        <div>
          <h3>RevPAR Trends:</h3>
          <Chart series={revPARChartData} options={revPARChartOptions} height={500} className='drop-shadow-lg' />
        </div>
        <div>
          <h3>TSA Passenger Trends:</h3>
          <Chart series={tsaChartData} options={tsaChartOptions} height={500} className='drop-shadow-lg' />
        </div>
      </section>
    </div>
  );
}
