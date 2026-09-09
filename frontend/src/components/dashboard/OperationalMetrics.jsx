import React from 'react';
import {
  Layers,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRightLeft,
  TrendingUp,
} from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters.js';

export const OperationalMetrics = ({ stats, onMetricClick }) => {
  const metrics = [
    {
      id: 'total-parcels',
      title: 'Total Parcels',
      value: stats?.totalParcels || 0,
      subtitle: `${stats?.totalAreaHectares || 0} Ha Land Digitized`,
      badge: '100% Cadastral',
      badgeClass: 'badge-cyan',
      icon: Layers,
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.1)',
      border: 'rgba(56, 189, 248, 0.25)',
    },
    {
      id: 'active-parcels',
      title: 'Active Parcels',
      value: stats?.activeParcels || 0,
      subtitle: 'Clear Title & Unencumbered',
      badge: 'Verified Clean',
      badgeClass: 'badge-emerald',
      icon: CheckCircle2,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.25)',
    },
    {
      id: 'pending-records',
      title: 'Pending Records / Mutations',
      value: stats?.pendingRecords || stats?.pendingMutations || 0,
      subtitle: 'Ferfar & RoR Verification',
      badge: 'Action Required',
      badgeClass: 'badge-amber',
      icon: Clock,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.25)',
    },
    {
      id: 'disputed-parcels',
      title: 'Disputed Parcels',
      value: stats?.disputedParcels || stats?.activeDisputes || 0,
      subtitle: 'Under Court / Injunction',
      badge: 'Litigation Tagged',
      badgeClass: 'badge-rose',
      icon: AlertTriangle,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.25)',
    },
    {
      id: 'recent-transactions',
      title: 'Recent Transactions',
      value: stats?.totalTransactions || 0,
      subtitle: `Assessed ${formatCurrencyINR(stats?.totalValuation)}`,
      badge: 'SRO Conveyances',
      badgeClass: 'badge-purple',
      icon: ArrowRightLeft,
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.1)',
      border: 'rgba(168, 85, 247, 0.25)',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
      }}
    >
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.id}
            className="card card-hover"
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: `1px solid ${m.border}`,
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: onMetricClick ? 'pointer' : 'default',
            }}
            onClick={() => onMetricClick && onMetricClick(m.id)}
          >
            {/* Top Row: Title and Icon */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-muted)',
                  }}
                >
                  {m.title}
                </span>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    lineHeight: 1.15,
                    marginTop: '0.35rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {m.value}
                </div>
              </div>

              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: m.bg,
                  color: m.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `1px solid ${m.border}`,
                }}
              >
                <Icon size={22} />
              </div>
            </div>

            {/* Bottom Row: Subtitle and Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '0.75rem',
                fontSize: '0.75rem',
              }}
            >
              <span style={{ color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {m.subtitle}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: m.bg,
                  color: m.color,
                  border: `1px solid ${m.border}`,
                }}
              >
                {m.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
