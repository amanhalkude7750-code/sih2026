import React from 'react';
import { FileText, Download, ShieldCheck, ExternalLink } from 'lucide-react';
import { formatDate, formatFileSize } from '../../utils/formatters.js';

export const DocumentVault = ({ documents = [] }) => {
  if (!documents.length) {
    return <div style={{ color: 'var(--text-dim)', padding: '1rem' }}>No digital documents archived for this parcel.</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
      {documents.map((doc) => (
        <div
          key={doc.document_id}
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileText size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                {doc.title}
              </h4>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {doc.document_type} • {formatFileSize(doc.file_size_kb)}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
            <div>Verified By: <strong>{doc.verified_by}</strong></div>
            <div>Uploaded: {formatDate(doc.uploaded_at)}</div>
            {doc.blockchain_txn_hash && (
              <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--primary-400)', marginTop: '0.25rem' }}>
                Proof: {doc.blockchain_txn_hash}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {doc.is_verified ? (
              <span className="badge badge-emerald">
                <ShieldCheck size={12} /> Verified Public Record
              </span>
            ) : (
              <span className="badge">Pending Verification</span>
            )}
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => alert(`Simulated download for: ${doc.title}`)}
              title="Download Document"
            >
              <Download size={14} /> View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
