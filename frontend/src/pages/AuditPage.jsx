import React, { useEffect, useState } from 'react';
import { History, ShieldCheck, Filter, Layers, Database } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { AuditTimeline } from '../components/records/AuditTimeline.jsx';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';
import { parcelService } from '../services/parcelService.js';

export const AuditPage = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [selectedParcelFilter, setSelectedParcelFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [auditRes, parcelsRes] = await Promise.all([
          parcelService.getAllAuditLogs(),
          parcelService.getParcels(),
        ]);
        setAuditLogs(auditRes.data || []);
        setParcels(parcelsRes.data || []);
      } catch (err) {
        console.error('Failed to load audit trail', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
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
            {parcels.map((p) => (
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
