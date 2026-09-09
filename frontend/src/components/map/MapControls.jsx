import React from 'react';
import { useMap } from 'react-leaflet';
import { Plus, Minus, Maximize2, Crosshair, Navigation } from 'lucide-react';

export const MapControls = ({ onResetExtent, onZoomToSelected, hasSelectedParcel }) => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      {/* Zoom In */}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleZoomIn}
        title="Zoom In"
        style={{
          width: '38px',
          height: '38px',
          padding: 0,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          color: 'var(--text-main)',
        }}
      >
        <Plus size={18} />
      </button>

      {/* Zoom Out */}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleZoomOut}
        title="Zoom Out"
        style={{
          width: '38px',
          height: '38px',
          padding: 0,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          color: 'var(--text-main)',
        }}
      >
        <Minus size={18} />
      </button>

      {/* Reset Extent */}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onResetExtent}
        title="Reset Cadastral Extent (All Parcels)"
        style={{
          width: '38px',
          height: '38px',
          padding: 0,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          color: 'var(--primary-700)',
        }}
      >
        <Maximize2 size={16} />
      </button>

      {/* Zoom to Selected Parcel */}
      {hasSelectedParcel && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onZoomToSelected}
          title="Zoom to Selected Parcel"
          style={{
            width: '38px',
            height: '38px',
            padding: 0,
            boxShadow: '0 0 12px var(--primary-glow)',
          }}
        >
          <Crosshair size={18} />
        </button>
      )}
    </div>
  );
};
