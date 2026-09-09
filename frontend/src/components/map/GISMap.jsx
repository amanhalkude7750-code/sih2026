import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { gisService, BASEMAP_TILES } from '../../services/gisService.js';
import { ParcelLayer } from './ParcelLayer.jsx';
import { SelectedParcelLayer } from './SelectedParcelLayer.jsx';
import { LayerControl } from './LayerControl.jsx';
import { MapControls } from './MapControls.jsx';
import { ParcelInspector } from './ParcelInspector.jsx';
import { ParcelSearch } from '../search/ParcelSearch.jsx';
import { LoadingSpinner } from '../ui/LoadingSpinner.jsx';
import { Compass } from 'lucide-react';
import { useParcelSelection } from '../../hooks/useParcelSelection.js';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons issue with Vite bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Helper component inside MapContainer to capture map instance
const MapController = ({ onMapReady }) => {
  const map = useMap();
  useEffect(() => {
    if (map) onMapReady(map);
  }, [map, onMapReady]);
  return null;
};

export const GISMap = ({ onOpenUnifiedView }) => {
  const {
    selectedParcelId,
    isInspectorOpen,
    setIsInspectorOpen,
    zoomRequest,
    selectParcel,
    clearSelection,
  } = useParcelSelection();

  const [geoJsonData, setGeoJsonData] = useState(null);
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
        const enriched = {
          ...rawGeo,
          features: rawGeo.features.map((f) => gisService.getEnrichedFeature(f)),
        };
        setGeoJsonData(enriched);
      } catch (err) {
        console.error('Failed to load Cadastral GeoJSON', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Synchronize selectedFeature whenever selectedParcelId or geoJsonData changes
  useEffect(() => {
    if (geoJsonData && selectedParcelId) {
      const feat = geoJsonData.features.find(
        (f) => f.properties.parcel_id.toUpperCase() === selectedParcelId.toUpperCase()
      );
      setSelectedFeature(feat || null);
    } else {
      setSelectedFeature(null);
    }
  }, [selectedParcelId, geoJsonData]);

  // Synchronize zoom whenever a zoomRequest is triggered from search or map controls
  useEffect(() => {
    if (zoomRequest && mapInstance && geoJsonData) {
      const feat = geoJsonData.features.find(
        (f) => f.properties.parcel_id.toUpperCase() === zoomRequest.parcelId.toUpperCase()
      );
      if (feat) {
        const bounds = gisService.getFeatureBounds(feat);
        if (bounds) {
          mapInstance.flyToBounds(bounds, {
            padding: [90, 90],
            maxZoom: 17,
            duration: 0.8,
          });
        }
      }
    }
  }, [zoomRequest, mapInstance, geoJsonData]);

  // Map polygon click handler - updates single source of truth
  const handleParcelClick = (parcelId, feature) => {
    selectParcel(parcelId, { openInspector: true, zoomMap: true });
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
      {/* Top Search & Cadastral HUD Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '75px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          maxWidth: 'calc(100% - 240px)',
        }}
      >
        <div style={{ width: '300px' }}>
          <ParcelSearch
            placeholder="Search ID, Survey, Owner..."
            width="100%"
          />
        </div>

        <div
          className="badge badge-emerald"
          style={{
            padding: '0.45rem 0.75rem',
            boxShadow: 'var(--shadow-md)',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            whiteSpace: 'nowrap',
          }}
        >
          <Compass size={13} /> Latur CRS84
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
        <SelectedParcelLayer feature={selectedFeature} autoZoom={false} />

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
      {isInspectorOpen && selectedFeature && (
        <ParcelInspector
          feature={selectedFeature}
          onClose={() => setIsInspectorOpen(false)}
          onZoomTo={handleZoomToSelected}
          onOpenUnifiedView={(id) => {
            if (onOpenUnifiedView) onOpenUnifiedView(id);
          }}
        />
      )}
    </div>
  );
};
