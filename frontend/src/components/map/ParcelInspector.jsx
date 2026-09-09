import React from 'react';
import {
  X,
  FileText,
  Crosshair,
  MapPin,
  User,
  Shield,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { StatusPill } from '../ui/StatusPill.jsx';
import { formatArea, formatCurrencyINR } from '../../utils/formatters.js';

export const ParcelInspector = ({
  feature,
  onClose,
  onOpenUnifiedView,
  onZoomTo,
}) => {
  if (!feature || !feature.properties) return null;
  const p = feature.properties;

  return (
    <div
      className="card"
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '20px',
        maxWidth: '380px',
        width: 'calc(100% - 40px)',
        zIndex: 1000,
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-subtle)',
        background: '#ffffff',
        padding: '1.25rem',
        animation: 'slideUp 0.25s ease-out',
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(15px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Survey No {p.survey_number}
            </h3>
            <StatusPill status={p.status} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {p.village}, Taluka {p.taluka}
          </div>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onClose}
          style={{ padding: '0.25rem', borderRadius: '50%' }}
          title="Close Inspector"
        >
          <X size={14} />
        </button>
      </div>

      {/* Attributes Mini-Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.65rem',
          background: 'var(--bg-surface-hover)',
          border: '1px solid var(--border-subtle)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.78rem',
          marginBottom: '1rem',
        }}
      >
        <div>
          <div style={{ color: 'var(--text-dim)' }}>Land Use</div>
          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{p.land_use}</div>
        </div>

        <div>
          <div style={{ color: 'var(--text-dim)' }}>Cadastral Area</div>
          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            {formatArea(p.area, 'Hectares')}
          </div>
        </div>

        {p.primary_owner && (
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ color: 'var(--text-dim)' }}>Title Holder / Owner</div>
            <div style={{ fontWeight: 600, color: 'var(--primary-700)' }}>
              {p.primary_owner}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onZoomTo}
          title="Zoom directly to this parcel boundary"
          style={{ flex: 1 }}
        >
          <Crosshair size={14} /> Zoom To
        </button>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => onOpenUnifiedView && onOpenUnifiedView(p.parcel_id)}
          style={{ flex: 1.5 }}
        >
          <span>Unified Dossier</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
