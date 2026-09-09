import React, { useState } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  Eye,
  LayoutGrid,
  List,
  Search,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { formatDate, formatFileSize } from '../../utils/formatters.js';
import { DocumentPreviewModal } from './DocumentPreviewModal.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';

export const DocumentVault = ({ documents = [] }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);

  if (!documents.length) {
    return (
      <EmptyState
        title="No Documents Available"
        description="No scanned or verified digital deeds, demarcation maps, or NOC certificates are archived for this parcel."
      />
    );
  }

  const filteredDocs = documents.filter((d) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      d.title.toLowerCase().includes(term) ||
      d.document_type.toLowerCase().includes(term) ||
      (d.document_number && d.document_number.toLowerCase().includes(term)) ||
      d.verified_by.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Search & Layout View Mode Switcher */}
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
            placeholder="Filter documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <LayoutGrid size={15} /> Grid
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

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredDocs.map((doc) => (
            <div
              key={doc.document_id}
              className="card card-hover"
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span className="badge badge-cyan">{doc.document_type}</span>
                      <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--primary-400)' }}>
                        #{doc.document_number}
                      </span>
                    </div>
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
                  <div>Issuing Authority: <strong style={{ color: 'var(--text-main)' }}>{doc.verified_by}</strong></div>
                  <div>Date: {formatDate(doc.uploaded_at)} • Size: {formatFileSize(doc.file_size_kb)}</div>
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
                {doc.is_verified || doc.status === 'Verified' ? (
                  <span className="badge badge-emerald">
                    <ShieldCheck size={12} /> Verified
                  </span>
                ) : (
                  <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
                    <Clock size={12} /> Pending
                  </span>
                )}

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedDoc(doc)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    title="Preview Document"
                  >
                    <Eye size={13} /> View
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => alert(`Downloading verified file: ${doc.title}`)}
                    title="Download File"
                  >
                    <Download size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table Mode */}
      {viewMode === 'table' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Document Type</th>
                <th>Document Number & Title</th>
                <th>Registration Date</th>
                <th>Authority / Issuer</th>
                <th>Size</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.document_id}>
                  <td>
                    <span className="badge badge-cyan">{doc.document_type}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{doc.title}</div>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--primary-400)' }}>
                      {doc.document_number}
                    </div>
                  </td>
                  <td>{formatDate(doc.uploaded_at)}</td>
                  <td>{doc.verified_by}</td>
                  <td>{formatFileSize(doc.file_size_kb)}</td>
                  <td>
                    {doc.is_verified || doc.status === 'Verified' ? (
                      <span className="badge badge-emerald">Verified</span>
                    ) : (
                      <span className="badge">Pending</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Preview */}
      {selectedDoc && (
        <DocumentPreviewModal
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
};
