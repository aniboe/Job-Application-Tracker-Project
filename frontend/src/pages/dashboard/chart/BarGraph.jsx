import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';

const CATEGORIES = [
  { key: 'Applied', color: '#3B82F6' },
  { key: 'Interview', color: '#F59E0B' },
  { key: 'Offer', color: '#8B5CF6' },
  { key: 'Accepted', color: '#10B981' },
  { key: 'Rejected', color: '#F43F5E' },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs transition-colors">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{data.category}:</span>{' '}
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{data.value}</span>
      </div>
    );
  }
  return null;
}

function BarGraph({ barGraphData = {} }) {
  const chartData = useMemo(() => {
    return CATEGORIES.map(({ key, color }) => ({
      category: key,
      value: barGraphData[key] ?? 0,
      color,
    }));
  }, [barGraphData]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 8, right: 24, left: 4, bottom: 8 }}
          barSize={14}
        >
          {/* Categories Label */}
          <YAxis
            type="category"
            dataKey="category"
            width={72}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#A1A1AA', fontSize: 12 }}
          />

          {/* Hidden Values Axis */}
          <XAxis type="number" axisLine={false} tickLine={false} hide />

          {/* Minimal Tooltip with dynamic cursor background for dark mode */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'currentColor', className: 'text-zinc-100 dark:text-zinc-800/40' }}
          />

          {/* Subtle Dynamic Status Colored Bars */}
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;