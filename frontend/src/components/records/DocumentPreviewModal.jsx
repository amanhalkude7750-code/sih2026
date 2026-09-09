import React from 'react';
import {
  X,
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
  Calendar,
  Building,
  Hash,
} from 'lucide-react';
import { formatDate, formatFileSize } from '../../utils/formatters.js';

export const DocumentPreviewModal = ({ document: doc, onClose }) => {
  if (!doc) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(19, 36, 22, 0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '820px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          padding: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-50)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {doc.title}
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="mono">Ref: {doc.document_number}</span>
                <span>•</span>
                <span>Parcel ID: <strong>{doc.parcel_id}</strong></span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => alert(`Printing document: ${doc.title}`)}
              title="Print Document"
            >
              <Printer size={14} />
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => alert(`Downloading verified copy of: ${doc.title}`)}
            >
              <Download size={14} /> Download
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              style={{ padding: '0.35rem' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body & Simulated Document View */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem',
              background: 'var(--bg-surface-elevated)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
            }}
          >
            <div>
              <div style={{ color: 'var(--text-dim)' }}>Document Type</div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                {doc.document_type}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-dim)' }}>Document Number</div>
              <div className="mono" style={{ fontWeight: 600, color: 'var(--primary-700)', marginTop: '2px' }}>
                {doc.document_number}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-dim)' }}>Certified By</div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                {doc.verified_by}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-dim)' }}>Registration Date</div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                {formatDate(doc.uploaded_at)}
              </div>
            </div>
          </div>

          {/* Simulated Official Public Document Viewer Placeholder */}
          <div
            style={{
              minHeight: '320px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              color: 'var(--text-main)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              fontFamily: 'serif',
            }}
          >
            {/* Document Emblem & Heading */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid var(--primary-700)', paddingBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Government of Maharashtra • Department of Revenue & Land Records
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)', marginTop: '0.25rem' }}>
                CERTIFIED PUBLIC RECORD COPY
              </h2>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontStyle: 'italic', marginTop: '2px' }}>
                {doc.title} — Registration #{doc.document_number}
              </div>
            </div>

            {/* Document Body Simulation */}
            <div style={{ padding: '1.5rem 0', lineHeight: 1.8, fontSize: '0.875rem' }}>
              <p>
                <strong>THIS IS AN OFFICIAL ELECTRONIC PUBLIC INSTRUMENT</strong> executed and entered in the cadastral registry of Maharashtra for Land Parcel Reference <strong style={{ fontFamily: 'monospace' }}>{doc.parcel_id}</strong>.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                The instrument has been authenticated in accordance with the Digital Land Governance Public Infrastructure guidelines. All boundary coordinates, spatial demarcation maps, and owner affirmations have been validated under Sub-Registrar / Survey jurisdiction.
              </p>
            </div>

            {/* Electronic Verification Seal */}
            <div
              style={{
                borderTop: '1px dashed var(--border-subtle)',
                paddingTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={28} style={{ color: 'var(--primary-600)' }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-700)' }}>
                    CRYPTOGRAPHICALLY VERIFIED RECORD
                  </div>
                  <div>DSC Signed by: {doc.verified_by}</div>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                <div>Proof: {doc.blockchain_txn_hash || 'SHA256:SECURE'}</div>
                <div>Format: {doc.mime_type} ({formatFileSize(doc.file_size_kb)})</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Digital Public Infrastructure • Verified Land Document Vault
          </span>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
