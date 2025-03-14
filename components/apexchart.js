'use client';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

export default function Charts({ series, options }) {
  const { theme } = useTheme();
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

  options = {
    ...options,
    theme: {
      mode: theme,
    },
  };

  return <Chart series={series} options={options} />;
}
