import React from 'react';
import { FileText, Download, ShieldCheck, ExternalLink, HardDrive } from 'lucide-react';
import { formatDate, formatFileSize } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export const DocumentsSection = ({ documents = [] }) => {
  if (!documents.length) {
    return (
      <EmptyState
        title="Document Vault Empty"
        description="No scanned or verified digital deeds, demarcation maps, or NOC certificates are archived for this parcel."
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.25rem',
      }}
    >
      {documents.map((doc) => (
        <div
          key={doc.document_id}
          className="card"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid var(--border-subtle)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: 'var(--accent-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FileText size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {doc.title}
                </h4>
                <span className="badge badge-cyan" style={{ marginTop: '4px' }}>
                  {doc.document_type}
                </span>
              </div>
            </div>

            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '0.65rem',
              }}
            >
              <div>Certified By: <strong style={{ color: 'var(--text-main)' }}>{doc.verified_by}</strong></div>
              <div>Archived On: {formatDate(doc.uploaded_at)} • {formatFileSize(doc.file_size_kb)}</div>
              {doc.blockchain_txn_hash && (
                <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--primary-400)', marginTop: '2px' }}>
                  Proof: {doc.blockchain_txn_hash}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '0.75rem',
            }}
          >
            {doc.is_verified ? (
              <span className="badge badge-emerald">
                <ShieldCheck size={12} /> Verified Public Record
              </span>
            ) : (
              <span className="badge">Pending Seal</span>
            )}

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => alert(`Opening official document: ${doc.title}`)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Download size={13} /> View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
