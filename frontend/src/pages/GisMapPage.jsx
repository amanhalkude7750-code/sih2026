import React, { useState } from 'react';
import { GISMap } from '../components/map/GISMap.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Layers, MapPin, Compass, ShieldCheck, Info } from 'lucide-react';

export const GisMapPage = ({ onOpenUnifiedView }) => {
  const [selectedParcelId, setSelectedParcelId] = useState(null);

  return (
    <PageContainer
      title="Cadastral GIS Spatial Engine"
      subtitle="Interactive vector map with spatial polygon boundaries, base map layers, and live parcel selection"
      badge={
        <span className="badge badge-emerald">
          <Compass size={13} /> WGS84 / CRS84 Vector Layer
        </span>
      }
      actions={
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="badge badge-cyan">
            <Layers size={13} /> 6 Cadastral Parcels Mapped
          </span>
        </div>
      }
    >
      {/* Interactive Master GIS Map */}
      <GISMap
        selectedParcelId={selectedParcelId}
        onSelectParcel={setSelectedParcelId}
        onOpenUnifiedView={onOpenUnifiedView}
      />

      {/* Spatial Legend & Guidance */}
      <div
        className="card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          fontSize: '0.8125rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '4px',
              background: 'rgba(16, 185, 129, 0.4)',
              border: '2px solid #10b981',
            }}
          />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Clear Title / Active</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Unencumbered cadastral polygon</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '4px',
              background: 'rgba(245, 158, 11, 0.4)',
              border: '2px dashed #f59e0b',
            }}
          />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Pending Mutation</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Active Ferfar review notice</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '4px',
              background: 'rgba(239, 68, 68, 0.4)',
              border: '2px solid #ef4444',
            }}
          />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Litigation / Disputed</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Court injunction flag active</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '4px',
              background: 'rgba(56, 189, 248, 0.7)',
              border: '2px solid #00f2fe',
              boxShadow: '0 0 8px rgba(56, 189, 248, 0.6)',
            }}
          />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>Selected Parcel</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>High-visibility active highlight</div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
