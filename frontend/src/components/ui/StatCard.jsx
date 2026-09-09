import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend }) => {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-label">{title}</div>
        <div className="stat-value">{value}</div>
        {subtitle && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
            {subtitle}
          </div>
        )}
      </div>
      {Icon && (
        <div className="stat-icon-box">
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};
