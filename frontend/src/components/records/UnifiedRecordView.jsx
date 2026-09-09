import React, { useState } from 'react';
import {
  Users,
  FileCheck,
  FolderLock,
  ArrowRightLeft,
  Scale,
  History,
  MapPin,
  Landmark,
  ShieldCheck,
  Calendar,
  Layers,
  FileText,
  BadgeAlert,
} from 'lucide-react';
import { StatusPill } from '../ui/StatusPill.jsx';
import { OwnershipTable } from './OwnershipTable.jsx';
import { LandRecordsList } from './LandRecordsList.jsx';
import { DocumentVault } from './DocumentVault.jsx';
import { TransactionHistory } from './TransactionHistory.jsx';
import { DisputeAlerts } from './DisputeAlerts.jsx';
import { AuditLogView } from './AuditLogView.jsx';
import { formatArea, formatCurrencyINR, formatDate } from '../../utils/formatters.js';

export const UnifiedRecordView = ({ unifiedData, onBack }) => {
  const [activeTab, setActiveTab] = useState('ownership');

  if (!unifiedData) return null;

  const { parcel, owners, landRecords, documents, transactions, disputes, auditTrail } =
    unifiedData;

  const hasActiveDispute = disputes.some((d) => d.status !== 'Disposed / Resolved');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner & Quick Actions */}
      <div className="card card-glass" style={{ borderLeft: '4px solid var(--primary-500)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                Unified Parcel Dossier: <span className="mono" style={{ color: 'var(--primary-400)' }}>{parcel.parcel_id}</span>
              </h2>
              <StatusPill status={parcel.status} />
              {hasActiveDispute && (
                <span className="badge" style={{ background: 'rgba(239,68,68,0.2)', color: 'var(--accent-rose)' }}>
                  <BadgeAlert size={14} /> Litigation Alert
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span>Survey No: <strong>{parcel.survey_number}</strong></span>
              <span>•</span>
              <span className="mono">ULPIN: {parcel.ulpin || 'Pending Bhu-Aadhaar'}</span>
              <span>•</span>
              <span>Jurisdiction: <strong>{parcel.village}, {parcel.taluka}, {parcel.district}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {onBack && (
              <button className="btn btn-secondary btn-sm" onClick={onBack}>
                ← Back to Explorer
              </button>
            )}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => alert(`Exporting Unified Land Dossier for Parcel ${parcel.parcel_id}`)}
            >
              <FileText size={14} /> Download DPI Dossier
            </button>
          </div>
        </div>

        {/* Master Attribute Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Total Area</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {formatArea(parcel.area, parcel.area_unit)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Land Use Classification</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
              {parcel.land_use}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Estimated Valuation</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary-400)' }}>
              {formatCurrencyINR(parcel.market_valuation_inr)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Cadastral Coordinates</div>
            <div className="mono" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {parcel.coordinates ? `${parcel.coordinates.lat}° N, ${parcel.coordinates.lng}° E` : 'Available in GIS'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Last Synchronized</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {formatDate(parcel.updated_at)}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation for Sub-Records */}
      <div className="card">
        <div className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'ownership' ? 'active' : ''}`}
            onClick={() => setActiveTab('ownership')}
          >
            <Users size={16} />
            <span>Ownership Title ({owners.length})</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'records' ? 'active' : ''}`}
            onClick={() => setActiveTab('records')}
          >
            <FileCheck size={16} />
            <span>7/12 & Statutory Extracts ({landRecords.length})</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FolderLock size={16} />
            <span>Verified Vault ({documents.length})</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <ArrowRightLeft size={16} />
            <span>Registry Transfers ({transactions.length})</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'disputes' ? 'active' : ''}`}
            onClick={() => setActiveTab('disputes')}
          >
            <Scale size={16} />
            <span>Disputes & Legal ({disputes.length})</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            <History size={16} />
            <span>Audit Trail ({auditTrail.length})</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div>
          {activeTab === 'ownership' && <OwnershipTable owners={owners} />}
          {activeTab === 'records' && <LandRecordsList records={landRecords} />}
          {activeTab === 'documents' && <DocumentVault documents={documents} />}
          {activeTab === 'transactions' && <TransactionHistory transactions={transactions} />}
          {activeTab === 'disputes' && <DisputeAlerts disputes={disputes} />}
          {activeTab === 'audit' && <AuditLogView auditEntries={auditTrail} />}
        </div>
      </div>
    </div>
  );
};
