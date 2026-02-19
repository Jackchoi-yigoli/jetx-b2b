'use client';

interface Bar {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  bars: Bar[];
  height?: number;
  color?: string;
  showValues?: boolean;
}

export default function BarChart({
  bars,
  height = 200,
  color = 'var(--color-primary)',
  showValues = false,
}: BarChartProps) {
  const maxValue = Math.max(...bars.map(b => b.value), 1);

  return (
    <div className="bar-chart" style={{ height, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '0 4px' }}>
      {bars.map((bar, i) => {
        const barHeight = (bar.value / maxValue) * (height - 30);
        return (
          <div key={i} className="bar-chart-col" style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6, minWidth: 0 }}>
            {showValues && (
              <div className="bar-chart-value">{bar.value.toLocaleString()}</div>
            )}
            <div
              className="bar-chart-bar"
              style={{
                height: barHeight,
                width: '100%',
                maxWidth: 48,
                borderRadius: '4px 4px 0 0',
                background: bar.color ?? color,
              }}
            />
            <div className="bar-chart-label">{bar.label}</div>
          </div>
        );
      })}
    </div>
  );
}
