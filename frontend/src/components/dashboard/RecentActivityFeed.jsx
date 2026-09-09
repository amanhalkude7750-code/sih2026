import React from 'react';
import { Clock, User, ShieldCheck, ArrowRightLeft, FileCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters.js';

export const RecentActivityFeed = ({ activities = [], onNavigateToParcel }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        No recent administrative activity recorded.
      </div>
    );
  }

  const getActionConfig = (action, type) => {
    if (type === 'TRANSACTION') {
      return {
        color: '#a855f7',
        bg: 'rgba(168, 85, 247, 0.12)',
        icon: ArrowRightLeft,
        label: action || 'Conveyance',
      };
    }

    switch (action) {
      case 'RECORD_VERIFIED':
        return {
          color: '#38bdf8',
          bg: 'rgba(56, 189, 248, 0.12)',
          icon: ShieldCheck,
          label: 'DSC Verified',
        };
      case 'MUTATION_REQUESTED':
        return {
          color: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.12)',
          icon: FileCheck,
          label: 'Ferfar Mutation',
        };
      case 'DISPUTE_FILED':
        return {
          color: '#ef4444',
          bg: 'rgba(239, 68, 68, 0.12)',
          icon: AlertTriangle,
          label: 'Dispute Tagged',
        };
      default:
        return {
          color: '#10b981',
          bg: 'rgba(16, 185, 129, 0.12)',
          icon: Clock,
          label: action || 'Action',
        };
    }
  };

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.25rem 1.5rem',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} style={{ color: 'var(--primary-600)' }} />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Recent Governance Activity
          </h4>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
          Real-time Audit & SRO Stream
        </span>
      </div>

      {/* Activity List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {activities.map((item) => {
          const cfg = getActionConfig(item.action, item.type);
          const Icon = cfg.icon;

          return (
            <div
              key={item.id}
              style={{
                background: 'var(--bg-surface-hover)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                transition: 'background var(--transition-fast)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: 'var(--radius-sm)',
                    background: cfg.bg,
                    color: cfg.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <Icon size={15} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.1rem 0.4rem',
                        borderRadius: '4px',
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.color}30`,
                      }}
                    >
                      {cfg.label}
                    </span>

                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {item.actor}
                    </span>

                    {item.role && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        ({item.role})
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: '0.775rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.description}
                  </p>

                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                    {formatDateTime(item.timestamp)}
                  </div>
                </div>
              </div>

              {/* Parcel ID Pill (Clickable) */}
              <button
                type="button"
                onClick={() => onNavigateToParcel && onNavigateToParcel(item.parcel_id)}
                className="mono"
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  color: 'var(--primary-400)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                title={`Inspect Parcel ${item.parcel_id}`}
              >
                <span>{item.parcel_id}</span>
                <ExternalLink size={10} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
