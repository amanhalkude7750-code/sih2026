import React from 'react';
import { History, ShieldCheck, UserCheck, Terminal } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters.js';

export const AuditLogView = ({ auditEntries = [] }) => {
  if (!auditEntries.length) {
    return <div style={{ color: 'var(--text-dim)', padding: '1rem' }}>No audit trail recorded.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {auditEntries.map((entry) => (
        <div
          key={entry.audit_id}
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-emerald">{entry.action}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {entry.performed_by}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                ({entry.user_role})
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {formatDateTime(entry.timestamp)}
            </div>
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-main)' }}>
            {entry.changes_summary}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            paddingTop: '0.4rem',
            marginTop: '0.25rem'
          }}>
            <span className="mono">Audit ID: {entry.audit_id}</span>
            <span className="mono">IP Address: {entry.ip_address}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
