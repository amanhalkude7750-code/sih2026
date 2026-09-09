import React from 'react';
import {
  Compass,
  TrendingUp,
  MapPin,
  User,
  Scale,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { StatCard } from '../ui/StatCard.jsx';
import { formatArea, formatCurrencyINR, formatDate } from '../../utils/formatters.js';

export const ParcelOverview = ({
  parcel,
  owners = [],
  landRecords = [],
  disputes = [],
  documents = [],
}) => {
  if (!parcel) return null;

  const primaryOwner = owners.find((o) => o.is_primary) || owners[0];
  const activeDisputes = disputes.filter((d) => d.status !== 'Disposed / Resolved');
  const verifiedRecordsCount = landRecords.filter((r) => r.digital_signature_verified).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* 4 Core Quantitative Metric Cards */}
      <div className="grid-cols-4">
        <StatCard
          title="Total Cadastral Area"
          value={formatArea(parcel.area, parcel.area_unit || 'Hectares')}
          subtitle={`Approx ${(Number(parcel.area) * 2.47105).toFixed(2)} Acres`}
          icon={Compass}
        />
        <StatCard
          title="Land Use Classification"
          value={parcel.land_use || 'Agricultural'}
          subtitle="Revenue Category Standard"
          icon={FileCheck}
        />
        <StatCard
          title="Assessed Market Value"
          value={formatCurrencyINR(parcel.market_valuation_inr)}
          subtitle="Ready Reckoner Guidance Rate"
          icon={TrendingUp}
        />
        <StatCard
          title="Spatial Coordinates"
          value={parcel.coordinates ? `${parcel.coordinates.lat.toFixed(3)}° N` : 'WGS84'}
          subtitle={parcel.coordinates ? `${parcel.coordinates.lng.toFixed(3)}° E (Latur)` : 'Cadastral Polygon'}
          icon={MapPin}
        />
      </div>

      {/* Instant Judge Q&A Matrix: One Parcel -> Full Context */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <HelpCircle size={18} style={{ color: 'var(--primary-400)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
            Unified Governance Snapshot
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            (Essential land governance decisions answered in one screen)
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* 1. Who owns it? */}
          <div
            style={{
              background: 'var(--bg-surface-elevated)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.35rem' }}>
              WHO OWNS IT?
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary-50)',
                  color: 'var(--primary-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <User size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.925rem' }}>
                  {primaryOwner ? primaryOwner.full_name : 'State Government Property'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {primaryOwner ? `${primaryOwner.ownership_type} (${primaryOwner.share_percentage}% Share)` : 'No private encumbrance'}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Where is it? */}
          <div
            style={{
              background: 'var(--bg-surface-elevated)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.35rem' }}>
              WHERE IS IT?
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--info-bg)',
                  color: 'var(--info-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.925rem' }}>
                  {parcel.village}, {parcel.taluka} Taluka
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  District: {parcel.district} • Sub-Division: {parcel.sub_division || 'Main'}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Are there disputes? */}
          <div
            style={{
              background: activeDisputes.length > 0 ? 'var(--danger-bg)' : 'var(--bg-surface-elevated)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: activeDisputes.length > 0 ? '1px solid #EAC8C1' : '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.35rem' }}>
              ARE THERE DISPUTES?
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: activeDisputes.length > 0 ? '#FBEBE8' : 'var(--primary-50)',
                  color: activeDisputes.length > 0 ? 'var(--danger-text)' : 'var(--primary-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {activeDisputes.length > 0 ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: activeDisputes.length > 0 ? 'var(--danger-text)' : 'var(--primary-700)', fontSize: '0.925rem' }}>
                  {activeDisputes.length > 0 ? `${activeDisputes.length} Active Litigation Case` : 'Clear Title — Zero Disputes'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {activeDisputes.length > 0 ? activeDisputes[0].court_authority : 'No stay orders or boundary conflicts'}
                </div>
              </div>
            </div>
          </div>

          {/* 4. What records & documents exist? */}
          <div
            style={{
              background: 'var(--bg-surface-elevated)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.35rem' }}>
              WHAT RECORDS & DOCUMENTS EXIST?
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary-50)',
                  color: 'var(--primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FileCheck size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.925rem' }}>
                  {landRecords.length} Statutory Records • {documents.length} Vault Files
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {verifiedRecordsCount} Cryptographically DSC Signed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
