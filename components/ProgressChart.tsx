"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function ProgressChart({ data }: { data: { date: string; mood: number; energy?: number }[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--lavender-deep)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--lavender-deep)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--sage-deep)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--sage-deep)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
          />
          <Tooltip
            cursor={{ stroke: 'var(--lavender-mid)', strokeWidth: 1 }}
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid var(--border)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              fontSize: '12px',
            }}
            formatter={(value: number, name: string) => [
              `${value}/5`,
              name === 'mood' ? 'Mood' : 'Energy'
            ]}
          />
          <Legend
            formatter={(value) => value === 'mood' ? 'Mood' : 'Energy'}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
          />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="var(--lavender-deep)"
            strokeWidth={2}
            fill="url(#moodGrad)"
            dot={{ r: 3, fill: 'var(--lavender-deep)', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: 'var(--lavender-deep)' }}
          />
          {data.some(d => d.energy !== undefined) && (
            <Area
              type="monotone"
              dataKey="energy"
              stroke="var(--sage-deep)"
              strokeWidth={2}
              fill="url(#energyGrad)"
              dot={{ r: 3, fill: 'var(--sage-deep)', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: 'var(--sage-deep)' }}
              strokeDasharray="4 2"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
