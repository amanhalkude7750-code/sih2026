import React from 'react';
import { MapPlaceholder } from '../components/map/MapPlaceholder.jsx';

export const GisMapPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <MapPlaceholder />
    </div>
  );
};
