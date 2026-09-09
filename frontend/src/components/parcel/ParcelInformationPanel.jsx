import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileCheck,
  FolderLock,
  ArrowRightLeft,
  Scale,
  History,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';
import { useParcelSelection } from '../../hooks/useParcelSelection.js';
import { useParcelDetail } from '../../hooks/useParcelDetail.js';
import { ParcelHeader } from './ParcelHeader.jsx';
import { ParcelOverview } from './ParcelOverview.jsx';
import { OwnerCard } from './OwnerCard.jsx';
import { LandRecordSection } from './LandRecordSection.jsx';
import { DocumentsSection } from './DocumentsSection.jsx';
import { TransactionsSection } from './TransactionsSection.jsx';
import { DisputesSection } from './DisputesSection.jsx';
import { AuditSection } from './AuditSection.jsx';
import { LoadingSpinner } from '../ui/LoadingSpinner.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';

export const ParcelInformationPanel = ({
  parcelId: propParcelId,
  onBack,
  defaultTab = 'overview',
}) => {
  const { selectedParcelId } = useParcelSelection();
  const activeParcelId = propParcelId || selectedParcelId || 'P001';
  const { unifiedData, loading, error, refetch } = useParcelDetail(activeParcelId);
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (loading) {
    return (
      <div className="card" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner message={`Compiling unified dossier for Parcel ${activeParcelId}...`} />
      </div>
    );
  }

  if (error || !unifiedData) {
    return (
      <EmptyState
        title={`Parcel ${activeParcelId} Not Found`}
        description={error || 'Unable to retrieve unified cadastral dossier. The parcel might not be indexed in the pilot database.'}
        action={
          <button className="btn btn-secondary btn-sm" onClick={refetch}>
            Retry Synchronization
          </button>
        }
      />
    );
  }

  const { parcel, owners, landRecords, documents, transactions, disputes, auditTrail } =
    unifiedData;

  const hasActiveDispute = disputes?.some((d) => d.status !== 'Disposed / Resolved');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'ownership', label: 'Ownership', icon: Users, count: owners?.length },
    { id: 'records', label: 'Land Records', icon: FileCheck, count: landRecords?.length },
    { id: 'documents', label: 'Documents', icon: FolderLock, count: documents?.length },
    { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft, count: transactions?.length },
    { id: 'disputes', label: 'Disputes', icon: Scale, count: disputes?.length, isAlert: hasActiveDispute },
    { id: 'audit', label: 'Audit', icon: History, count: auditTrail?.length },
  ];

  return (
    <div className="parcel-information-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Optional Back Button */}
      {onBack && (
        <div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>
      )}

      {/* 1. Persistent Primary Identifier Header */}
      <ParcelHeader
        parcel={parcel}
        hasActiveDispute={hasActiveDispute}
        onExportDossier={() => alert(`Exporting DPI Dossier for ${parcel.parcel_id} (Survey #${parcel.survey_number})`)}
      />

      {/* 2. Main Content Card with Tabs */}
      <div className="card">
        {/* Navigation Tabs Bar */}
        <div className="tabs-nav" style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '0.65rem' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                className={`tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  position: 'relative',
                  borderBottom: isActive ? '2px solid var(--primary-400)' : 'none',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '10px',
                      background: tab.isAlert
                        ? 'rgba(239, 68, 68, 0.25)'
                        : isActive
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.08)',
                      color: tab.isAlert
                        ? 'var(--accent-rose)'
                        : isActive
                        ? '#ffffff'
                        : 'var(--text-muted)',
                      fontWeight: 700,
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. Section Content Display */}
        <div style={{ paddingTop: '0.5rem' }}>
          {activeTab === 'overview' && (
            <ParcelOverview
              parcel={parcel}
              owners={owners}
              landRecords={landRecords}
              disputes={disputes}
              documents={documents}
            />
          )}

          {activeTab === 'ownership' && <OwnerCard owners={owners} />}

          {activeTab === 'records' && <LandRecordSection records={landRecords} />}

          {activeTab === 'documents' && <DocumentsSection documents={documents} />}

          {activeTab === 'transactions' && <TransactionsSection transactions={transactions} />}

          {activeTab === 'disputes' && <DisputesSection disputes={disputes} />}

          {activeTab === 'audit' && <AuditSection auditTrail={auditTrail} />}
        </div>
      </div>
    </div>
  );
};
