import React from 'react';
import { MapPin, Layers, Compass, Navigation, Database } from 'lucide-react';
import { ENV } from '../../config/env.js';

export const MapPlaceholder = () => {
  return (
    <div className="card" style={{
      minHeight: '520px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, rgba(15, 23, 42, 0.9) 100%)',
      border: '1px dashed rgba(16, 185, 129, 0.3)',
      textAlign: 'center',
      padding: '3rem',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.15)',
        color: 'var(--primary-400)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem',
      }}>
        <Compass size={32} />
      </div>

      <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
        GIS Cadastral Spatial Engine (Ready for Module 2)
      </h3>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '520px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Spatial foundation established: GeoJSON Cadastral boundaries are indexed in{' '}
        <span className="mono" style={{ color: 'var(--accent-blue)' }}>src/data/geojson/parcels.geojson</span>.
        Module 2 will wire interactive spatial vector layers, boundary conflict overlays, and satellite tile providers.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="badge badge-emerald">
          <Layers size={13} /> GeoJSON CRS84 Ready
        </span>
        <span className="badge badge-cyan">
          <Navigation size={13} /> Latur Cadastral Coordinates Pre-loaded
        </span>
        <span className="badge">
          <Database size={13} /> PostGIS Contract Aligned
        </span>
      </div>
    </div>
  );
};
