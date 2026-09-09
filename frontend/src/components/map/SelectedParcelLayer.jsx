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
    fillColor: '#1A6AFF',
    weight: 4,
    opacity: 1,
    color: '#0D4EC7',
    dashArray: '',
    fillOpacity: 0.5,
  };

  return (
    <GeoJSON
      key={`selected-${feature.properties.parcel_id}`}
      data={feature}
      style={() => style}
    />
  );
};
