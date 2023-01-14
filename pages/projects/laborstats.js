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
    dateData.unshift(employmentRawData.data[i].year + '-' + employmentRawData.data[i].period);
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
    dateData.unshift(employmentRawData.data[i - 35].year + '-' + employmentRawData.data[i - 35].period);
  }
  for (let i = 35; i < hospitalityEmploymentRawData.data.length; i++) {
    hospitalityEmploymentData.unshift(
      (hospitalityEmploymentRawData.data[i - 35].value / hospitalityEmploymentRawData.data[i].value - 1) * 100
    );
  }
  const finalData = { dateData, employmentData, hospitalityEmploymentData };
  return finalData;
}

function createCPIData(data) {
  const cpiRawData = data.Results.series.filter((s) => s.seriesID == 'CUSR0000SA0')[0];

  const cpiChartData = cpiRawData.data.reduce((obj, month, i) => {
    const previousMonth = cpiRawData[i + 1];
    if (!obj['date']) {
      obj['date'] = [`${month['year']}-${month['periodName']}`];
    } else {
      obj['date'].unshift([`${month['year']}-${month['periodName']}`]);
    }
    if (!obj['cpiValue']) {
      obj['cpiValue'] = [month['value']];
    } else {
      obj['cpiValue'].unshift([month['value']]);
    }
    if (!obj['change']) {
      obj['change'] = [Math.round((month['value'] / previousMonth['value'] - 1) * 1000) / 10];
    } else {
      if (previousMonth) {
        obj['change'].unshift([Math.round((month['value'] / previousMonth['value'] - 1) * 1000) / 10]);
      }
    }
    return obj;
  }, {});
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

function cpiDataChartOptions(data) {
  const cpiData = createCPIData(data);

  const cpiChartData = [
    {
      name: 'CPI',
      data: cpiData['cpiValue'],
    },
    {
      name: '% Change',
      data: cpiData['change'],
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
      text: 'CPI',
      align: 'center',
      style: {
        fontWeight: 600,
        fontSize: '16px',
      },
    },
    xaxis: {
      categories: cpiData['date'],
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
        seriesName: 'CPI',
        forceNiceScale: true,
        decimalsInFloat: 2,
      },
      {
        opposite: true,
        seriesName: '% Change',
        forceNiceScale: true,
        decimalsInFloat: 2,
      },
    ],
  };
  return { cpiChartData, cpiChartOptions };
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

  return (
    <Layout>
      <Head>
        <title>U.S. Employment Data</title>
      </Head>
      <h2 className={utilStyles.headingLg}>U.S. Employment Data</h2>
      <section>
        <div>
          <h3>CPI</h3>
          <CreateChart data={cpiChartData} options={cpiChartOptions} type={'line'} height={500} />
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
