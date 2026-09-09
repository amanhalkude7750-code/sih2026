import React from 'react';
import { Scale, AlertTriangle, ShieldCheck, CheckCircle2, ShieldAlert, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';

export const DisputesSection = ({ disputes = [] }) => {
  if (!disputes.length) {
    return (
      <div
        className="card"
        style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)',
            color: 'var(--primary-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <CheckCircle2 size={28} />
        </div>
        <div>
          <h4 style={{ color: 'var(--primary-400)', fontSize: '1.1rem', fontWeight: 700 }}>
            Clean Encumbrance & Dispute Free
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            No civil suits, boundary conflicts, or stay orders have been filed against this parcel. Title is unencumbered and clear for governance transactions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {disputes.map((disp) => {
        const isResolved = disp.status === 'Disposed / Resolved';

        return (
          <div
            key={disp.dispute_id}
            className="card"
            style={{
              background: isResolved ? 'rgba(15, 23, 42, 0.7)' : 'rgba(239, 68, 68, 0.08)',
              border: isResolved ? '1px solid var(--border-subtle)' : '1px solid rgba(239, 68, 68, 0.4)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: isResolved ? 'rgba(255, 255, 255, 0.05)' : 'rgba(239, 68, 68, 0.2)',
                    color: isResolved ? 'var(--text-muted)' : 'var(--accent-rose)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Scale size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {disp.dispute_type} — Case #{disp.case_number}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {disp.court_authority} • Filed: {formatDate(disp.filing_date)}
                  </div>
                </div>
              </div>

              <span className={`status-pill ${isResolved ? 'status-active' : 'status-disputed'}`}>
                {disp.status}
              </span>
            </div>

            {/* Case Summary */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                color: 'var(--text-main)',
                lineHeight: 1.5,
              }}
            >
              <strong>Judicial Allegation Summary: </strong>
              {disp.summary}
            </div>

            {/* Parties & Injunction Notice */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '0.75rem',
              }}
            >
              <div>Plaintiff: <strong style={{ color: 'var(--text-main)' }}>{disp.plaintiff}</strong></div>
              <div>Respondent: <strong style={{ color: 'var(--text-main)' }}>{disp.respondent}</strong></div>
              {disp.stay_order && (
                <div style={{ color: 'var(--accent-rose)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldAlert size={14} /> Court Stay Order Active
                </div>
              )}
              {disp.next_hearing_date && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-blue)' }}>
                  <Calendar size={13} />
                  <span>Next Hearing: <strong>{formatDate(disp.next_hearing_date)}</strong></span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
