import React from 'react';
import { FileCheck, ShieldCheck, Clock, Hash, AlertCircle } from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export const LandRecordSection = ({ records = [] }) => {
  if (!records.length) {
    return (
      <EmptyState
        title="No Statutory Land Records Found"
        description="No 7/12, 8A Khata, or Ferfar mutation extracts are currently linked with this parcel."
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {records.map((rec) => (
        <div
          key={rec.record_id}
          className="card"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: rec.digital_signature_verified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: rec.digital_signature_verified ? 'var(--primary-400)' : 'var(--accent-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FileCheck size={22} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {rec.record_type}
                  </h4>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--primary-400)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {rec.record_number}
                  </span>
                  {rec.mutation_no && (
                    <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', background: 'rgba(56, 189, 248, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {rec.mutation_no}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Authority: <strong>{rec.issuing_authority}</strong> • Issued: {formatDate(rec.issue_date)}
                </div>
              </div>
            </div>

            <div>
              {rec.digital_signature_verified ? (
                <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={14} /> DSC Signed & Verified
                </span>
              ) : (
                <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
                  <Clock size={14} /> Mutation In-Progress
                </span>
              )}
            </div>
          </div>

          {rec.remarks && (
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderLeft: '3px solid var(--primary-500)',
                padding: '0.65rem 0.85rem',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                fontSize: '0.8125rem',
                color: 'var(--text-main)',
                lineHeight: 1.5,
              }}
            >
              <strong>Official Note: </strong>{rec.remarks}
            </div>
          )}

          <div
            className="mono"
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.04)',
              paddingTop: '0.5rem',
            }}
          >
            <Hash size={12} />
            <span>Digital Proof Hash: {rec.verification_hash}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
