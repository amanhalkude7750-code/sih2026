import React from 'react';
import { GeoJSON, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { gisService } from '../../services/gisService.js';

// Custom lightweight SVG marker for Centroid Pins
const createCentroidIcon = (status) => {
  const color = status === 'Disputed' ? '#ef4444' : status === 'Pending Mutation' ? '#f59e0b' : '#10b981';
  return L.divIcon({
    className: 'custom-centroid-pin',
    html: `<div style="
      width: 14px;
      height: 14px;
      background: ${color};
      border: 2px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 8px ${color};
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
};

export const ParcelLayer = ({
  geoJsonData,
  selectedParcelId,
  onSelectParcel,
  overlayConfig,
}) => {
  if (!geoJsonData || !overlayConfig.showBoundaries) return null;

  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
    const isSelected = props.parcel_id === selectedParcelId;

    // Interactive mouse events
    layer.on({
      mouseover: (e) => {
        const l = e.target;
        l.setStyle(gisService.getHoverStyle(props.parcel_id === selectedParcelId));
        l.bringToFront();
      },
      mouseout: (e) => {
        const l = e.target;
        l.setStyle(gisService.getParcelStyle(feature, props.parcel_id === selectedParcelId));
      },
      click: () => {
        if (onSelectParcel) {
          onSelectParcel(props.parcel_id, feature);
        }
      },
    });

    // Tooltip with survey and parcel info
    const tooltipContent = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 2px 4px;">
        <div style="font-weight: 800; color: #10b981; font-size: 0.85rem;">
          Parcel ${props.parcel_id} <span style="color: #94a3b8; font-weight: normal;">(#${props.survey_number})</span>
        </div>
        <div style="font-size: 0.75rem; color: #f8fafc; margin-top: 2px;">
          ${props.village}, ${props.taluka}
        </div>
        <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 2px;">
          Area: <strong>${props.area} Ha</strong> • ${props.land_use}
        </div>
        <div style="font-size: 0.7rem; font-weight: 700; color: ${props.status === 'Disputed' ? '#ef4444' : props.status === 'Pending Mutation' ? '#f59e0b' : '#34d399'}; margin-top: 3px;">
          ● ${props.status}
        </div>
      </div>
    `;

    layer.bindTooltip(tooltipContent, {
      sticky: true,
      direction: 'top',
      className: 'gis-custom-tooltip',
      opacity: 0.95,
    });
  };

  const styleFeature = (feature) => {
    const isSelected = feature.properties.parcel_id === selectedParcelId;
    return gisService.getParcelStyle(feature, isSelected);
  };

  return (
    <>
      <GeoJSON
        key={`geojson-cadastral-${selectedParcelId || 'none'}-${overlayConfig.showDisputes}`}
        data={geoJsonData}
        style={styleFeature}
        onEachFeature={onEachFeature}
      />

      {/* Survey Number Labels Layer */}
      {overlayConfig.showLabels &&
        geoJsonData.features.map((feat) => {
          const center = gisService.getFeatureCenter(feat);
          if (!center) return null;
          return (
            <Marker
              key={`label-${feat.properties.parcel_id}`}
              position={center}
              icon={L.divIcon({
                className: 'cadastral-survey-label',
                html: `<div style="
                  font-family: 'JetBrains Mono', monospace;
                  background: rgba(15, 23, 42, 0.85);
                  color: #38bdf8;
                  border: 1px solid rgba(56, 189, 248, 0.4);
                  border-radius: 4px;
                  padding: 1px 6px;
                  font-size: 11px;
                  font-weight: 700;
                  white-space: nowrap;
                  transform: translate(-50%, -50%);
                  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
                ">${feat.properties.survey_number}</div>`,
                iconSize: [0, 0],
              })}
            />
          );
        })}

      {/* Centroid Markers */}
      {overlayConfig.showCentroids &&
        geoJsonData.features.map((feat) => {
          const center = gisService.getFeatureCenter(feat);
          if (!center) return null;
          return (
            <Marker
              key={`centroid-${feat.properties.parcel_id}`}
              position={center}
              icon={createCentroidIcon(feat.properties.status)}
            />
          );
        })}
    </>
  );
};
