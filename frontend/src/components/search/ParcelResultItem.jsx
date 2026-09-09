import React from 'react';
import { MapPin, User, ArrowRight, Layers, FileCheck } from 'lucide-react';
import { StatusPill } from '../ui/StatusPill.jsx';
import { formatArea } from '../../utils/formatters.js';

export const ParcelResultItem = ({
  parcel,
  isSelected,
  onSelect,
}) => {
  if (!parcel) return null;

  return (
    <div
      onClick={() => onSelect && onSelect(parcel.parcel_id, parcel)}
      className="search-result-item"
      style={{
        padding: '0.85rem 1rem',
        borderRadius: 'var(--radius-md)',
        background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
        border: isSelected ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        transition: 'all var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'var(--bg-surface-hover)';
          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
        }
      }}
    >
      {/* Top Row: ID, Survey, and Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="mono" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-400)' }}>
            {parcel.parcel_id}
          </span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Survey #{parcel.survey_number}
          </span>
          {parcel.match_reason && (
            <span
              style={{
                fontSize: '0.65rem',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(56, 189, 248, 0.15)',
                color: 'var(--accent-blue)',
                fontWeight: 600,
              }}
            >
              {parcel.match_reason}
            </span>
          )}
        </div>

        <StatusPill status={parcel.status} />
      </div>

      {/* Middle Row: Location & Primary Owner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <MapPin size={13} style={{ color: 'var(--accent-blue)' }} />
          <span>{parcel.village}, {parcel.taluka}</span>
        </div>

        {parcel.primary_owner && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-main)', fontWeight: 500 }}>
            <User size={12} style={{ color: 'var(--primary-400)' }} />
            <span>{parcel.primary_owner}</span>
          </div>
        )}
      </div>

      {/* Bottom Row: Area, Land Use, Action */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: 'var(--text-dim)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        paddingTop: '0.4rem',
      }}>
        <div>
          {formatArea(parcel.area, parcel.area_unit || 'Hectares')} • {parcel.land_use}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-400)', fontWeight: 600 }}>
          <span>Select & Zoom</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </div>
  );
};
