import React from 'react';

export const NavigationItem = ({
  id,
  label,
  icon: Icon,
  isActive,
  badge,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`nav-item ${isActive ? 'active' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0.75rem 0.9rem',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
        color: isActive ? 'var(--primary-400)' : 'var(--text-muted)',
        fontWeight: isActive ? 700 : 500,
        fontSize: '0.875rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'left',
        transition: 'all var(--transition-fast)',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {Icon && (
          <Icon
            size={18}
            style={{
              color: isActive ? 'var(--primary-400)' : 'var(--text-dim)',
              flexShrink: 0,
            }}
          />
        )}
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </div>

      {badge && (
        <span
          style={{
            fontSize: '0.65rem',
            padding: '0.15rem 0.45rem',
            borderRadius: 'var(--radius-sm)',
            background: isActive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(56, 189, 248, 0.15)',
            color: isActive ? 'var(--primary-300)' : 'var(--accent-blue)',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
};
