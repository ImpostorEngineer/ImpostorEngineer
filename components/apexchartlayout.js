import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import utilStyles from '../styles/utils.module.css';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function CreateChart({ data, options, type, height }) {
  const [chartOptions] = useState(options);
  const [chartSeries] = useState(data);

  return (
    <div className={utilStyles.chartArea}>
      <Chart options={chartOptions} series={chartSeries} type={type} height={height} />
    </div>
  );
}
