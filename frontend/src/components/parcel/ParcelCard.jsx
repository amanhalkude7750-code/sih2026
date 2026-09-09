import React from 'react';
import { MapPin, User, FileCheck, AlertTriangle, ArrowRight, Shield } from 'lucide-react';
import { StatusPill } from '../ui/StatusPill.jsx';
import { formatArea, formatCurrencyINR } from '../../utils/formatters.js';

export const ParcelCard = ({ parcel, onSelect }) => {
  if (!parcel) return null;

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header with Parcel ID and Status */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="mono" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary-400)' }}>
              {parcel.parcel_id}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              (Survey #{parcel.survey_number})
            </span>
          </div>
          {parcel.ulpin && (
            <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
              ULPIN: {parcel.ulpin}
            </div>
          )}
        </div>
        <StatusPill status={parcel.status} />
      </div>

      {/* Location and Metadata */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.8125rem' }}>
        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Location</div>
          <div style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapPin size={13} style={{ color: 'var(--accent-blue)' }} />
            {parcel.village}, {parcel.taluka}
          </div>
        </div>

        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Land Use</div>
          <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {parcel.land_use}
          </div>
        </div>

        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Total Area</div>
          <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {formatArea(parcel.area, parcel.area_unit)}
          </div>
        </div>

        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>Valuation</div>
          <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {formatCurrencyINR(parcel.market_valuation_inr)}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '0.85rem',
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          District: {parcel.district}
        </span>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onSelect && onSelect(parcel.parcel_id)}
        >
          <span>Unified View</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
