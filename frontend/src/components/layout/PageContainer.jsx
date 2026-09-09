import React from 'react';

export const PageContainer = ({
  title,
  subtitle,
  badge,
  actions,
  children,
  className = '',
}) => {
  return (
    <div className={`page-container ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {(title || actions) && (
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {title && <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{title}</h1>}
              {badge}
            </div>
            {subtitle && (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
