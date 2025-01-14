'use client';
import dynamic from 'next/dynamic';
import { useTheme } from '../../context/ThemeContext';
import strRawData from '../../assets/data/strdata.json';
import tsaRawData from '../../assets/data/passengerData.json';

export default function Dashboard() {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
  const { theme } = useTheme();

  const updateDate = 'Jan 17, 2025';

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
        name: '2024',
        data: tsaChartSourceData['2024'],
      },
      {
        name: '2023',
        data: tsaChartSourceData['2023'],
      },
      {
        name: 'Gap',
        data: tsaChartSourceData['gap'],
      },
    ];

    const tsaChartMax = Math.ceil((Math.max(...tsaChartSourceData['2024']) + 100000) / 10) * 10;
    const tsaChartMin = Math.floor((Math.min(...tsaChartSourceData['2024']) - 100000) / 10) * 10;
    const tsaChartMaxGap = Math.ceil((Math.max(...tsaChartSourceData['gap']) + 5) / 10) * 10;
    const tsaChartMinGap = Math.floor((Math.min(...tsaChartSourceData['gap']) - 5) / 10) * 10;
    const tsaChartTickAmount = -(tsaChartMinGap - tsaChartMaxGap) / 10;

    const tsaChartOptions = {
      chart: {
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
        borderColor: '#333',
        opacity: 0.1,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      colors: ['#EA3546', '#F26624', '#dddddd'],
      fill: {
        type: 'solid',
        opacity: [1, 0.4, 0.2],
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
          seriesName: '2024',
          showAlways: true,
          show: true,
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
          seriesName: '2023',
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
          opposite: true,
          seriesName: 'Gap',
          max: tsaChartMaxGap,
          min: tsaChartMinGap,
          tickAmount: tsaChartTickAmount,
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
            y2: tsaChartMinGap,
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

    const indexedYears = ['2023', '2024'];
    let strDataIndex = { occIndex: [], ADRIndex: [], date: [] };

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
    ];

    const mainChartOptions = {
      chart: {
        dropShadow: {
          enabled: true,
          enabledOnSeries: [7],
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
        tickAmount: 10,
        showAlways: true,
      },
      legend: {
        height: 35,
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
        text: 'Indexed to 2022, Source: STR, str.com',
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
            x: '1/6/2024',
            x2: strDataIndex['date'][strDataIndex['date'].length - 1],
            strokeDashArray: 0,
            borderColor: '#333',
            fillColor: '#ccc',
            opacity: 0.1,
            offsetX: 0,
            offsetY: 0,
            label: {
              text: '2024',
              textAnchor: 'middle',
              orientation: 'vertical',
              style: {
                background: '#fff',
                color: '#777',
                fontSize: '11px',
                fontWeight: 400,
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
      yaxis: {
        max: 130,
        tickAmount: 10,
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
