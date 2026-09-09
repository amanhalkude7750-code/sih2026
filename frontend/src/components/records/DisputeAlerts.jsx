import React from 'react';
import { AlertOctagon, Scale, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';

export const DisputeAlerts = ({ disputes = [] }) => {
  if (!disputes.length) {
    return (
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <CheckCircle2 size={28} style={{ color: 'var(--primary-400)' }} />
        <div>
          <h4 style={{ color: 'var(--primary-400)', fontSize: '0.95rem' }}>No Active Litigation or Encumbrance</h4>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            This parcel is currently free of court injunctions, title suits, or boundary claims.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {disputes.map((disp) => {
        const isResolved = disp.status === 'Disposed / Resolved';
        return (
          <div
            key={disp.dispute_id}
            style={{
              background: isResolved ? 'rgba(15, 23, 42, 0.6)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${isResolved ? 'var(--border-subtle)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: isResolved ? 'rgba(255, 255, 255, 0.05)' : 'rgba(239, 68, 68, 0.2)',
                  color: isResolved ? 'var(--text-muted)' : 'var(--accent-rose)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Scale size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {disp.dispute_type} — Case #{disp.case_number}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {disp.court_authority} • Filed: {formatDate(disp.filing_date)}
                  </div>
                </div>
              </div>

              <span className={`status-pill ${isResolved ? 'status-active' : 'status-disputed'}`}>
                {disp.status}
              </span>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--text-main)',
              lineHeight: 1.4,
            }}>
              <strong>Summary: </strong> {disp.summary}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div>Plaintiff: <strong>{disp.plaintiff}</strong></div>
              <div>Respondent: <strong>{disp.respondent}</strong></div>
              {disp.stay_order && (
                <div style={{ color: 'var(--accent-rose)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldAlert size={14} /> Stay Order Injunction Active
                </div>
              )}
              {disp.next_hearing_date && (
                <div>Next Hearing: <strong>{formatDate(disp.next_hearing_date)}</strong></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
