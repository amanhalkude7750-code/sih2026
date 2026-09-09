import React from 'react';
import { History, ShieldCheck, User, Terminal, Clock } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export const AuditSection = ({ auditTrail = [] }) => {
  if (!auditTrail.length) {
    return (
      <EmptyState
        title="Audit Log Empty"
        description="No historical modifications, status updates, or revenue mutations have been logged for this parcel yet."
      />
    );
  }

  const actionColors = {
    CREATED: 'badge-emerald',
    RECORD_VERIFIED: 'badge-emerald',
    MUTATION_REQUESTED: 'badge-cyan',
    DISPUTE_FILED: 'badge-danger',
    STATUS_CHANGED: 'badge-cyan',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {auditTrail.map((entry) => (
        <div
          key={entry.audit_id}
          className="card"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid var(--border-subtle)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className={`badge ${actionColors[entry.action] || 'badge-emerald'}`}>
                {entry.action}
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {entry.performed_by}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                ({entry.user_role})
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Clock size={13} />
              <span>{formatDateTime(entry.timestamp)}</span>
            </div>
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
            {entry.changes_summary}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              color: 'var(--text-dim)',
              borderTop: '1px solid rgba(255, 255, 255, 0.04)',
              paddingTop: '0.5rem',
            }}
          >
            <span className="mono">Entry Hash: {entry.audit_id}</span>
            <span className="mono">Station IP: {entry.ip_address}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
