import React, { useState } from 'react';
import { Layers, Eye, EyeOff, Map, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { BASEMAP_TILES } from '../../services/gisService.js';

export const LayerControl = ({
  activeBasemap,
  onSelectBasemap,
  overlayConfig,
  onToggleOverlay,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        width: isOpen ? '260px' : 'auto',
      }}
    >
      {/* Toggle Button */}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          padding: '0.5rem 0.85rem',
        }}
      >
        <Layers size={16} style={{ color: 'var(--primary-400)' }} />
        <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Layers</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Expanded Control Box */}
      {isOpen && (
        <div
          className="card card-glass"
          style={{
            marginTop: '8px',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Base Layer Switcher */}
          <div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '0.5rem',
                letterSpacing: '0.05em',
              }}
            >
              Base Map Tile Provider
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.values(BASEMAP_TILES).map((tile) => {
                const isActive = activeBasemap === tile.id;
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => onSelectBasemap(tile.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                      color: isActive ? 'var(--primary-400)' : 'var(--text-main)',
                      fontSize: '0.78rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{tile.name}</span>
                    {isActive && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overlays Toggle */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '0.5rem',
                letterSpacing: '0.05em',
              }}
            >
              Cadastral Overlays
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* Cadastral Polygons */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                }}
              >
                <span>Parcel Boundaries</span>
                <input
                  type="checkbox"
                  checked={overlayConfig.showBoundaries}
                  onChange={() => onToggleOverlay('showBoundaries')}
                  style={{ accentColor: 'var(--primary-500)', cursor: 'pointer' }}
                />
              </label>

              {/* Survey Numbers Labels */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                }}
              >
                <span>Survey No. Labels</span>
                <input
                  type="checkbox"
                  checked={overlayConfig.showLabels}
                  onChange={() => onToggleOverlay('showLabels')}
                  style={{ accentColor: 'var(--primary-500)', cursor: 'pointer' }}
                />
              </label>

              {/* Dispute Alerts */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ color: 'var(--accent-rose)' }}>Dispute Highlights</span>
                <input
                  type="checkbox"
                  checked={overlayConfig.showDisputes}
                  onChange={() => onToggleOverlay('showDisputes')}
                  style={{ accentColor: 'var(--accent-rose)', cursor: 'pointer' }}
                />
              </label>

              {/* Centroid Pins */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                }}
              >
                <span>Centroid Pins</span>
                <input
                  type="checkbox"
                  checked={overlayConfig.showCentroids}
                  onChange={() => onToggleOverlay('showCentroids')}
                  style={{ accentColor: 'var(--accent-blue)', cursor: 'pointer' }}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
