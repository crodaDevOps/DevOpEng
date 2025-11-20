import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';

// Custom Tooltip for Cyberpunk style
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 text-xs font-mono shadow-xl">
        <p className="text-accent mb-1 border-b border-border pb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MetricBarChart = ({ data, xKey, yKey, color = "#00ff9f" }: { data: any[], xKey: string, yKey: string, color?: string }) => {
  return (
    <div className="w-full h-48 text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.2} />
          <XAxis dataKey={xKey} stroke="var(--text-primary)" tick={{fill: 'var(--text-primary)'}} />
          <YAxis stroke="var(--text-primary)" tick={{fill: 'var(--text-primary)'}} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--text-primary)', opacity: 0.1}} />
          <Bar dataKey={yKey} fill={color} radius={[0, 0, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MetricLineChart = ({ data, xKey, yKeys, colors }: { data: any[], xKey: string, yKeys: string[], colors: string[] }) => {
  return (
    <div className="w-full h-48 text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.2} />
          <XAxis dataKey={xKey} stroke="var(--text-primary)" tick={{fill: 'var(--text-primary)'}} />
          <YAxis stroke="var(--text-primary)" tick={{fill: 'var(--text-primary)'}} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {yKeys.map((key, idx) => (
            <Line 
              key={key}
              type="monotone" 
              dataKey={key} 
              stroke={colors[idx] || '#00ff9f'} 
              strokeWidth={2}
              dot={{ r: 3, fill: colors[idx] || '#00ff9f', strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};