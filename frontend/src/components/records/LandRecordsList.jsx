import React from 'react';
import { FileCheck, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';

export const LandRecordsList = ({ records = [] }) => {
  if (!records.length) {
    return <div style={{ color: 'var(--text-dim)', padding: '1rem' }}>No statutory land records available.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {records.map((rec) => (
        <div
          key={rec.record_id}
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: rec.digital_signature_verified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              color: rec.digital_signature_verified ? 'var(--primary-400)' : 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileCheck size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{rec.record_type}</h4>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--primary-400)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                  {rec.record_number}
                </span>
                {rec.mutation_no && (
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', background: 'rgba(56, 189, 248, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    {rec.mutation_no}
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Issuing Authority: <strong>{rec.issuing_authority}</strong> • Issued: {formatDate(rec.issue_date)}
              </div>

              {rec.remarks && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-main)', background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary-500)' }}>
                  {rec.remarks}
                </p>
              )}

              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                Verification Hash: {rec.verification_hash}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            {rec.digital_signature_verified ? (
              <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={14} /> DSC Verified
              </span>
            ) : (
              <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
                <Clock size={14} /> Under Process
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
