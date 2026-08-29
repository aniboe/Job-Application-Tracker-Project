import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-lg border border-zinc-200 shadow-sm text-xs">
        {label && <p className="font-medium text-zinc-400 mb-1">{label}</p>}
        <div className="flex flex-col gap-1">
          {payload.map((entry) => (
            <div key={entry.dataKey} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="capitalize text-zinc-600">{entry.dataKey}:</span>
              <span className="font-semibold text-zinc-900">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function LineGaph({ lineGraphData = [] }) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={lineGraphData}
          margin={{ top: 12, right: 12, left: 12, bottom: 8 }}
        >
          {/* Subtle Horizontal Guidelines */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F4F4F5"
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#A1A1AA', fontSize: 11 }}
            dy={6}
          />
          <YAxis axisLine={false} tickLine={false} hide allowDecimals={false} />

          {/* Minimal Card Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Applications Line */}
          <Line
            dataKey="applications"
            type="monotone"
            stroke="#18181B"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#18181B', strokeWidth: 0 }}
          />

          {/* Interviews Line */}
          <Line
            dataKey="interviews"
            type="monotone"
            stroke="#3B82F6"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGaph;

/*NOTE:
    * type="basis" : makes the lines smooth so the 
      real datapoints and actual lines can be be in diffrent position 
      to disable data points for "Tooltip" use "activeDot={false}"
 */