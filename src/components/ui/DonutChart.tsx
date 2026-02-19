'use client';

interface DonutSegment {
  value: number;
  color: string;
  label: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
  centerValue?: string;
  centerLabel?: string;
}

export default function DonutChart({
  segments,
  size = 180,
  thickness = 28,
  centerValue,
  centerLabel,
}: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return null;

  // Build conic-gradient stops
  const stops: string[] = [];
  segments.reduce((acc, seg) => {
    const start = (acc / total) * 360;
    const end = ((acc + seg.value) / total) * 360;
    stops.push(`${seg.color} ${start}deg ${end}deg`);
    return acc + seg.value;
  }, 0);

  const innerSize = size - thickness * 2;

  return (
    <div>
      <div className="donut-chart" style={{ width: size, height: size, position: 'relative' }}>
        <div
          className="donut-chart-ring"
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `conic-gradient(${stops.join(', ')})`,
          }}
        >
          <div
            style={{
              width: innerSize,
              height: innerSize,
              borderRadius: '50%',
              background: 'var(--color-bg-card)',
            }}
          />
        </div>
        {(centerValue || centerLabel) && (
          <div className="donut-chart-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            {centerValue && <div className="donut-chart-center-value" style={{ fontSize: 24, fontWeight: 700 }}>{centerValue}</div>}
            {centerLabel && <div className="donut-chart-center-label" style={{ fontSize: 12, opacity: 0.7 }}>{centerLabel}</div>}
          </div>
        )}
      </div>
      <div className="chart-legend" style={{ marginTop: 16, paddingTop: 0, borderTop: 'none', display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}>
        {segments.map(seg => (
          <div key={seg.label} className="chart-legend-item" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <span className="chart-legend-dot" style={{ background: seg.color, width: 10, height: 10, borderRadius: '50%', flexShrink: 0, display: 'inline-block' }} />
            {seg.label} ({total > 0 ? Math.round((seg.value / total) * 100) : 0}%)
          </div>
        ))}
      </div>
    </div>
  );
}
