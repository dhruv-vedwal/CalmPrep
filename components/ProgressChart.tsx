"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressChart({ data }: { data: any[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-med)" />
          <XAxis dataKey="date" tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize: 12, fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip 
            cursor={{fill: 'var(--lavender)'}} 
            contentStyle={{borderRadius: '12px', border: '1px solid var(--borderLight)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}
          />
          <Bar dataKey="mood" fill="var(--lavender-deep)" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
