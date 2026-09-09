import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { gisService, BASEMAP_TILES } from '../../services/gisService.js';
import { useParcelSelection } from '../../hooks/useParcelSelection.js';
import { Maximize2, MapPin, Layers, ExternalLink, ShieldCheck, Eye } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Map Controller for fitBounds and center
const MapViewController = ({ selectedFeature }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedFeature && map) {
      try {
        const layer = L.geoJSON(selectedFeature);
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          map.flyToBounds(bounds, { padding: [40, 40], maxZoom: 16, duration: 1 });
        }
      } catch (err) {
        console.warn('Could not zoom to feature', err);
      }
    }
  }, [selectedFeature, map]);

  return null;
};

export const GISOverviewCard = ({ onNavigateToParcel, onOpenFullGIS }) => {
  const { selectedParcelId, selectParcel } = useParcelSelection();
  const [geoData, setGeoData] = useState(null);
  const [activeBasemap, setActiveBasemap] = useState('dark');
  const [activeFeature, setActiveFeature] = useState(null);
  const [loading, setLoading] = useState(true);
  const geoJsonRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const raw = await gisService.getCadastralGeoJSON();
        const enriched = {
          ...raw,
          features: raw.features.map((f) => gisService.getEnrichedFeature(f)),
        };
        setGeoData(enriched);

        // Pre-select if already selected
        if (selectedParcelId) {
          const match = enriched.features.find(
            (f) => f.properties.parcel_id === selectedParcelId
          );
          if (match) setActiveFeature(match);
        }
      } catch (err) {
        console.error('Failed to load cadastral map preview', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedParcelId]);

  const onEachFeature = (feature, layer) => {
    const p = feature.properties;
    const isDisputed = p.status === 'Disputed';
    const isPending = p.status === 'Pending Mutation';

    const statusColor = isDisputed ? '#ef4444' : isPending ? '#f59e0b' : '#10b981';

    // Tooltip
    layer.bindTooltip(
      `
      <div style="font-family: var(--font-sans); padding: 4px;">
        <strong style="color: #38bdf8;">Parcel ${p.parcel_id}</strong> (Survey #${p.survey_number})<br/>
        <span style="font-size: 11px; color: #94a3b8;">${p.village} • ${p.area} Ha</span><br/>
        <span style="font-size: 11px; color: ${statusColor}; font-weight: 700;">● ${p.status}</span>
      </div>
      `,
      { sticky: true, className: 'gis-custom-tooltip' }
    );

    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          weight: 3,
          color: '#ffffff',
          fillOpacity: 0.65,
        });
        target.bringToFront();
      },
      mouseout: (e) => {
        const target = e.target;
        const isSelected = p.parcel_id === selectedParcelId;
        target.setStyle(gisService.getParcelStyle(feature, isSelected));
      },
      click: () => {
        setActiveFeature(feature);
        selectParcel(p.parcel_id, { openInspector: false, zoomMap: false });
      },
    });
  };

  const currentBasemap = BASEMAP_TILES[activeBasemap] || BASEMAP_TILES.dark;

  return (
    <div
      className="card"
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '440px',
        position: 'relative',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* GIS Header Controls */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Layers size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Cadastral GIS Spatial Overview
            </h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Latur District Pilot • EPSG:4326 PostGIS Cadastre
            </span>
          </div>
        </div>

        {/* Actions: Basemap toggle & Open Full Studio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Basemap Chips */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', padding: '2px' }}>
            {['dark', 'satellite', 'streets'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setActiveBasemap(mode)}
                style={{
                  background: activeBasemap === mode ? 'var(--primary-600)' : 'transparent',
                  color: activeBasemap === mode ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          {onOpenFullGIS && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenFullGIS}
              style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
              title="Open full interactive GIS Studio"
            >
              <Maximize2 size={13} />
              <span>Full Studio</span>
            </button>
          )}
        </div>
      </div>

      {/* Embedded Leaflet Map Container */}
      <div style={{ position: 'relative', flex: 1, minHeight: '340px' }}>
        {loading ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-secondary)',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
            }}
          >
            Loading Cadastral Vector Map...
          </div>
        ) : (
          <MapContainer
            center={[18.258, 76.51]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '100%', minHeight: '340px' }}
          >
            <TileLayer
              attribution={currentBasemap.attribution}
              url={currentBasemap.url}
              maxZoom={currentBasemap.maxZoom}
            />

            {geoData && (
              <GeoJSON
                ref={geoJsonRef}
                key={`${activeBasemap}-${selectedParcelId}`}
                data={geoData}
                style={(feat) =>
                  gisService.getParcelStyle(
                    feat,
                    feat.properties.parcel_id === selectedParcelId
                  )
                }
                onEachFeature={onEachFeature}
              />
            )}

            <MapViewController selectedFeature={activeFeature} />
          </MapContainer>
        )}

        {/* Legend Overlay at Bottom-Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.4rem 0.75rem',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.7rem',
            color: 'var(--text-main)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            <span>Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
            <span>Pending</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
            <span>Disputed</span>
          </div>
        </div>

        {/* Selected Parcel Quick Action Overlay at Bottom-Right */}
        {activeFeature && (
          <div
            className="card card-glass"
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              maxWidth: '300px',
              padding: '0.75rem 1rem',
              zIndex: 1000,
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid var(--border-focus)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-400)' }}>
                {activeFeature.properties.parcel_id}
              </span>
              <span
                className={`status-pill ${
                  activeFeature.properties.status === 'Disputed'
                    ? 'status-disputed'
                    : activeFeature.properties.status === 'Pending Mutation'
                    ? 'status-pending'
                    : 'status-active'
                }`}
                style={{ fontSize: '0.65rem', padding: '0.1rem 0.45rem' }}
              >
                <span className="status-dot" />
                {activeFeature.properties.status}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Survey #{activeFeature.properties.survey_number} • {activeFeature.properties.village} ({activeFeature.properties.area} Ha)
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onNavigateToParcel && onNavigateToParcel(activeFeature.properties.parcel_id)}
              style={{ fontSize: '0.72rem', width: '100%', padding: '0.35rem' }}
            >
              <Eye size={13} />
              <span>Inspect Unified View</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
