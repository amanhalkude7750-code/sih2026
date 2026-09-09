import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { gisService, BASEMAP_TILES } from '../../services/gisService.js';
import { ParcelLayer } from './ParcelLayer.jsx';
import { SelectedParcelLayer } from './SelectedParcelLayer.jsx';
import { LayerControl } from './LayerControl.jsx';
import { MapControls } from './MapControls.jsx';
import { ParcelInspector } from './ParcelInspector.jsx';
import { LoadingSpinner } from '../ui/LoadingSpinner.jsx';
import { Search, Compass, Layers, CheckCircle2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons issue with Vite bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Helper component inside MapContainer to access map instance
const MapController = ({ onMapReady }) => {
  const map = useMap();
  useEffect(() => {
    if (map) onMapReady(map);
  }, [map, onMapReady]);
  return null;
};

export const GISMap = ({
  selectedParcelId: propSelectedParcelId,
  onSelectParcel: propOnSelectParcel,
  onOpenUnifiedView,
}) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedParcelId, setSelectedParcelId] = useState(propSelectedParcelId || null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [activeBasemap, setActiveBasemap] = useState('satellite');
  const [mapInstance, setMapInstance] = useState(null);
  const [loading, setLoading] = useState(true);

  // Overlays configuration
  const [overlayConfig, setOverlayConfig] = useState({
    showBoundaries: true,
    showLabels: true,
    showDisputes: true,
    showCentroids: false,
  });

  // Load GeoJSON data from separate service
  useEffect(() => {
    async function loadData() {
      try {
        const rawGeo = await gisService.getCadastralGeoJSON();
        // Enrich each feature
        const enriched = {
          ...rawGeo,
          features: rawGeo.features.map((f) => gisService.getEnrichedFeature(f)),
        };
        setGeoJsonData(enriched);

        // If a parcel_id was provided as prop, highlight it
        if (propSelectedParcelId) {
          const matched = enriched.features.find(
            (f) => f.properties.parcel_id === propSelectedParcelId
          );
          if (matched) {
            setSelectedParcelId(propSelectedParcelId);
            setSelectedFeature(matched);
          }
        }
      } catch (err) {
        console.error('Failed to load Cadastral GeoJSON', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propSelectedParcelId]);

  // Handle parcel selection from click or dropdown
  const handleParcelClick = (parcelId, feature) => {
    setSelectedParcelId(parcelId);
    setSelectedFeature(feature);
    if (propOnSelectParcel) propOnSelectParcel(parcelId);
  };

  // Zoom to selected parcel
  const handleZoomToSelected = () => {
    if (selectedFeature && mapInstance) {
      const bounds = gisService.getFeatureBounds(selectedFeature);
      if (bounds) {
        mapInstance.flyToBounds(bounds, {
          padding: [80, 80],
          maxZoom: 17,
          duration: 0.8,
        });
      }
    }
  };

  // Reset map extent to encompass all parcels in Latur pilot
  const handleResetExtent = () => {
    if (geoJsonData && mapInstance) {
      const allCoords = geoJsonData.features.flatMap(
        (f) => f.geometry.coordinates[0]
      );
      if (allCoords.length) {
        const lats = allCoords.map((c) => c[1]);
        const lngs = allCoords.map((c) => c[0]);
        const bounds = [
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)],
        ];
        mapInstance.flyToBounds(bounds, {
          padding: [50, 50],
          duration: 0.8,
        });
      }
    }
  };

  const handleToggleOverlay = (key) => {
    setOverlayConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return <LoadingSpinner message="Initializing GIS Cadastral Vector Engine..." />;
  }

  const currentBasemap = BASEMAP_TILES[activeBasemap] || BASEMAP_TILES.satellite;

  // Latur Center default
  const defaultCenter = [18.35, 76.62];

  return (
    <div
      className="gis-map-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '700px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-lg)',
        background: '#0b0f19',
      }}
    >
      {/* Top Cadastral Jump Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '75px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <div
          className="card card-glass"
          style={{
            padding: '0.35rem 0.65rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <Search size={14} style={{ color: 'var(--text-dim)' }} />
          <select
            className="select-field"
            value={selectedParcelId || ''}
            onChange={(e) => {
              const pId = e.target.value;
              if (!pId) {
                setSelectedParcelId(null);
                setSelectedFeature(null);
                return;
              }
              const feat = geoJsonData?.features.find(
                (f) => f.properties.parcel_id === pId
              );
              if (feat) {
                handleParcelClick(pId, feat);
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.2rem 0.5rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--primary-400)',
            }}
          >
            <option value="">Jump to Parcel...</option>
            {geoJsonData?.features.map((f) => (
              <option key={f.properties.parcel_id} value={f.properties.parcel_id}>
                {f.properties.parcel_id} — Survey {f.properties.survey_number} ({f.properties.village})
              </option>
            ))}
          </select>
        </div>

        <div
          className="badge badge-emerald"
          style={{
            padding: '0.45rem 0.75rem',
            boxShadow: 'var(--shadow-md)',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Compass size={13} /> Latur Cadastral CRS84
        </div>
      </div>

      {/* Master Leaflet Map */}
      <MapContainer
        center={defaultCenter}
        zoom={11}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <MapController onMapReady={setMapInstance} />

        {/* Dynamic Tile Layer */}
        <TileLayer
          key={currentBasemap.id}
          url={currentBasemap.url}
          attribution={currentBasemap.attribution}
          maxZoom={currentBasemap.maxZoom}
        />

        {/* Parcel Polygons Layer */}
        <ParcelLayer
          geoJsonData={geoJsonData}
          selectedParcelId={selectedParcelId}
          onSelectParcel={handleParcelClick}
          overlayConfig={overlayConfig}
        />

        {/* Selected Highlight Layer */}
        <SelectedParcelLayer feature={selectedFeature} autoZoom={true} />

        {/* Custom Controls */}
        <MapControls
          onResetExtent={handleResetExtent}
          onZoomToSelected={handleZoomToSelected}
          hasSelectedParcel={!!selectedFeature}
        />

        {/* Layer Visibility Controls */}
        <LayerControl
          activeBasemap={activeBasemap}
          onSelectBasemap={setActiveBasemap}
          overlayConfig={overlayConfig}
          onToggleOverlay={handleToggleOverlay}
        />
      </MapContainer>

      {/* Clicked Parcel Inspector Floating Card */}
      {selectedFeature && (
        <ParcelInspector
          feature={selectedFeature}
          onClose={() => {
            setSelectedParcelId(null);
            setSelectedFeature(null);
          }}
          onZoomTo={handleZoomToSelected}
          onOpenUnifiedView={(id) => {
            if (onOpenUnifiedView) onOpenUnifiedView(id);
          }}
        />
      )}
    </div>
  );
};
