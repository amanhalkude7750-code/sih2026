import React, { useEffect, useState } from 'react';
import { History, ShieldCheck, Filter, Layers, Database } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { AuditTimeline } from '../components/records/AuditTimeline.jsx';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';
import { mockAuditEntries } from '../data/mock/auditEntries.js';
import { mockParcels } from '../data/mock/parcels.js';

export const AuditPage = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [selectedParcelFilter, setSelectedParcelFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In mock mode, load audit entries with simulated latency
    const timer = setTimeout(() => {
      setAuditLogs(mockAuditEntries);
      setLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const displayedLogs = selectedParcelFilter === 'All'
    ? auditLogs
    : auditLogs.filter((l) => l.parcel_id === selectedParcelFilter);

  return (
    <PageContainer
      title="Tamper-Evident Governance Audit Trail"
      subtitle="Comprehensive chronological ledger of parcel mutations, title transfers, and revenue authority actions"
      badge={
        <span className="badge badge-emerald">
          <ShieldCheck size={14} /> Immutable Ledger Active
        </span>
      }
      actions={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Filter by Parcel:</span>
          <select
            className="select-field"
            value={selectedParcelFilter}
            onChange={(e) => setSelectedParcelFilter(e.target.value)}
            style={{ fontWeight: 600, color: 'var(--primary-400)' }}
          >
            <option value="All">All Cadastral Parcels</option>
            {mockParcels.map((p) => (
              <option key={p.parcel_id} value={p.parcel_id}>
                {p.parcel_id} — Survey {p.survey_number} ({p.village})
              </option>
            ))}
          </select>
        </div>
      }
    >
      <div className="card">
        {loading ? (
          <LoadingSpinner message="Verifying audit log hashes and cryptographic proofs..." />
        ) : (
          <AuditTimeline auditTrail={displayedLogs} />
        )}
      </div>
    </PageContainer>
  );
};
