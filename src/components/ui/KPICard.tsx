import React from 'react';

interface KPICardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'warning';
}

export default function KPICard({ label, value, change, changeType }: KPICardProps) {
  const changeColorClass = changeType === 'positive' 
    ? 'text-success' 
    : changeType === 'negative' 
    ? 'text-error' 
    : 'text-warning';

  return (
    <div className="bg-white rounded-lg border border-border p-5 shadow-sm">
      <div className="text-sm text-text-secondary mb-2">{label}</div>
      <div className="text-2xl font-semibold text-text-primary mb-1">{value}</div>
      {change && (
        <div className={`text-sm ${changeColorClass}`}>{change}</div>
      )}
    </div>
  );
}
