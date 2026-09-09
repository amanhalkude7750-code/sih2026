import React, { useEffect, useState } from 'react';
import { History, ShieldCheck, Filter } from 'lucide-react';
import { parcelService } from '../services/parcelService.js';
import { AuditLogView } from '../components/records/AuditLogView.jsx';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';
import { mockAuditEntries } from '../data/mock/auditEntries.js';

export const AuditPage = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In mock mode, load all audit entries
    setTimeout(() => {
      setAuditLogs(mockAuditEntries);
      setLoading(false);
    }, 150);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card card-glass">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Tamper-Evident Governance Audit Trail</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Comprehensive chronological ledger of parcel mutations, title transfers, and revenue authority actions
            </p>
          </div>
          <span className="badge badge-emerald">
            <ShieldCheck size={14} /> Immutable Ledger Active
          </span>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <LoadingSpinner message="Verifying audit log hashes..." />
        ) : (
          <AuditLogView auditEntries={auditLogs} />
        )}
      </div>
    </div>
  );
};
