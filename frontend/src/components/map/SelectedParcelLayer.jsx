import React, { useEffect } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { gisService } from '../../services/gisService.js';

export const SelectedParcelLayer = ({ feature, autoZoom = true }) => {
  const map = useMap();

  useEffect(() => {
    if (feature && autoZoom) {
      const bounds = gisService.getFeatureBounds(feature);
      if (bounds) {
        map.flyToBounds(bounds, {
          padding: [80, 80],
          maxZoom: 17,
          duration: 0.8,
        });
      }
    }
  }, [feature, autoZoom, map]);

  if (!feature) return null;

  const style = {
    fillColor: '#38bdf8',
    weight: 4,
    opacity: 1,
    color: '#00f2fe',
    dashArray: '',
    fillOpacity: 0.7,
  };

  return (
    <GeoJSON
      key={`selected-${feature.properties.parcel_id}`}
      data={feature}
      style={() => style}
    />
  );
};
