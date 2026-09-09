import React, { useState } from 'react';
import {
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Download,
  Share2,
  Compass,
  FileText,
} from 'lucide-react';
import { StatusPill } from '../ui/StatusPill.jsx';

export const ParcelHeader = ({ parcel, hasActiveDispute, onExportDossier }) => {
  const [copied, setCopied] = useState(false);

  if (!parcel) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(parcel.parcel_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="card card-glass parcel-header-card"
      style={{
        borderLeft: '4px solid var(--primary-500)',
        padding: '1.75rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        {/* Primary Identifier & Location */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Prominent Parcel ID */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                className="mono"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'var(--primary-400)',
                  letterSpacing: '0.02em',
                }}
              >
                {parcel.parcel_id}
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCopyId}
                title="Copy Parcel ID"
                style={{ padding: '0.25rem 0.4rem', height: '26px' }}
              >
                {copied ? <Check size={13} style={{ color: 'var(--primary-400)' }} /> : <Copy size={13} />}
              </button>
            </div>

            {/* Primary Survey Number */}
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-main)',
              }}
            >
              Survey #{parcel.survey_number}
              {parcel.sub_division ? `/${parcel.sub_division}` : ''}
            </span>

            {/* Status Pill */}
            <StatusPill status={parcel.status} />

            {/* Injunction Warning Tag if Disputed */}
            {hasActiveDispute && (
              <span
                className="badge"
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: 'var(--accent-rose)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                }}
              >
                <AlertTriangle size={13} /> Active Court Stay Injunction
              </span>
            )}
          </div>

          {/* Sub-identifiers: ULPIN & Administrative Hierarchy */}
          <div
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginTop: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} style={{ color: 'var(--accent-blue)' }} />
              <span>
                <strong>{parcel.village}</strong>, {parcel.taluka} Taluka, {parcel.district} District, {parcel.state || 'Maharashtra'}
              </span>
            </div>

            <span>•</span>

            <div className="mono" style={{ color: 'var(--text-dim)' }}>
              ULPIN: <strong style={{ color: 'var(--text-main)' }}>{parcel.ulpin || 'MH-LTR-PENDING'}</strong>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onExportDossier || (() => alert(`Exporting DPI Dossier for Parcel ${parcel.parcel_id}`))}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={15} />
            <span>Export Official Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
