'use client';

interface Segment {
  key: string;
  value: number;
  color: string;
}

interface StackedBar {
  label: string;
  segments: Segment[];
}

interface LegendItem {
  key: string;
  label: string;
  color: string;
}

interface StackedBarChartProps {
  bars: StackedBar[];
  height?: number;
  legend?: LegendItem[];
}

export default function StackedBarChart({
  bars,
  height = 200,
  legend,
}: StackedBarChartProps) {
  const maxTotal = Math.max(
    ...bars.map(b => b.segments.reduce((sum, s) => sum + s.value, 0)),
    1
  );
  const barAreaHeight = height - 30;

  return (
    <div>
      <div className="bar-chart" style={{ height, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '0 4px' }}>
        {bars.map((bar, i) => {
          const total = bar.segments.reduce((sum, s) => sum + s.value, 0);
          const stackHeight = (total / maxTotal) * barAreaHeight;
          return (
            <div key={i} className="bar-chart-col" style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6, minWidth: 0 }}>
              <div className="bar-chart-stacked" style={{ height: stackHeight, display: 'flex', flexDirection: 'column' as const, gap: 1, width: '100%', maxWidth: 48 }}>
                {bar.segments.map(seg => {
                  const segHeight = total > 0 ? (seg.value / total) * stackHeight : 0;
                  return (
                    <div
                      key={seg.key}
                      className="bar-chart-bar"
                      style={{
                        height: segHeight,
                        width: '100%',
                        background: seg.color,
                        borderRadius: 0,
                      }}
                    />
                  );
                })}
              </div>
              <div className="bar-chart-label">{bar.label}</div>
            </div>
          );
        })}
      </div>
      {legend && (
        <div className="chart-legend">
          {legend.map(item => (
            <div key={item.key} className="chart-legend-item">
              <span className="chart-legend-dot" style={{ background: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
