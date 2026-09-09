import React, { useState } from 'react';
import {
  FileCheck,
  ShieldCheck,
  Clock,
  Hash,
  LayoutGrid,
  List,
  Search,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export const LandRecordsList = ({ records = [] }) => {
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'table'
  const [searchTerm, setSearchTerm] = useState('');

  if (!records.length) {
    return (
      <EmptyState
        title="No Land Records Linked"
        description="No statutory 7/12 extracts, 8A Khata, or Ferfar mutation records are registered for this parcel."
      />
    );
  }

  const filtered = records.filter((r) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.record_type.toLowerCase().includes(term) ||
      r.record_number.toLowerCase().includes(term) ||
      (r.mutation_no && r.mutation_no.toLowerCase().includes(term)) ||
      r.issuing_authority.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Search & Layout View Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div className="input-group" style={{ maxWidth: '320px', width: '100%' }}>
          <Search size={15} style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Filter land records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'card' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('card')}
            title="Card View"
          >
            <LayoutGrid size={15} /> Cards
          </button>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <List size={15} /> Table
          </button>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((rec) => (
            <div
              key={rec.record_id}
              className="card"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
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
                      background: rec.digital_signature_verified ? 'var(--primary-50)' : 'var(--warning-bg)',
                      color: rec.digital_signature_verified ? 'var(--primary-700)' : 'var(--warning-text)',
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
                      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--primary-700)', background: 'var(--primary-50)', border: '1px solid var(--primary-200)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        #{rec.record_number}
                      </span>
                      {rec.mutation_no && (
                        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--info-text)', background: 'var(--info-bg)', border: '1px solid #BFDBFE', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          Ferfar #{rec.mutation_no}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Issuing Authority: <strong>{rec.issuing_authority}</strong> • Date: {formatDate(rec.issue_date)}
                    </div>
                  </div>
                </div>

                <div>
                  {rec.digital_signature_verified ? (
                    <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <ShieldCheck size={14} /> DSC Cryptographically Signed
                    </span>
                  ) : (
                    <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} /> {rec.status}
                    </span>
                  )}
                </div>
              </div>

              {rec.remarks && (
                <div
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    borderLeft: '3px solid var(--primary-600)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    fontSize: '0.8125rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.5,
                  }}
                >
                  <strong>Statutory Remarks: </strong>{rec.remarks}
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
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.5rem',
                }}
              >
                <Hash size={12} />
                <span>Verification Hash: {rec.verification_hash}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Record Type</th>
                <th>Record / Ferfar Number</th>
                <th>Issuing Authority</th>
                <th>Issue Date</th>
                <th>DSC Signature Status</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rec) => (
                <tr key={rec.record_id}>
                  <td>
                    <span className="badge badge-cyan">{rec.record_type}</span>
                  </td>
                  <td className="mono" style={{ fontWeight: 600, color: 'var(--primary-400)' }}>
                    {rec.record_number}
                    {rec.mutation_no && (
                      <div style={{ fontSize: '0.7rem', color: 'var(--accent-blue)' }}>
                        ({rec.mutation_no})
                      </div>
                    )}
                  </td>
                  <td>{rec.issuing_authority}</td>
                  <td>{formatDate(rec.issue_date)}</td>
                  <td>
                    {rec.digital_signature_verified ? (
                      <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <ShieldCheck size={12} /> DSC Verified
                      </span>
                    ) : (
                      <span className="badge">Pending</span>
                    )}
                  </td>
                  <td>
                    <span className="badge badge-emerald">{rec.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
