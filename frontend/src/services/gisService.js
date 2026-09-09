/**
 * GIS Spatial Service
 * 
 * Manages Cadastral GeoJSON layer loading, spatial indexing,
 * bounding box computations, and vector polygon styling.
 * Completely local/synthetic for Module 3 offline readiness.
 */

import parcelsGeoJson from '../data/geojson/parcels.json';
import { mockParcels } from '../data/mock/parcels.js';
import { mockOwners } from '../data/mock/owners.js';

export const BASEMAP_TILES = {
  satellite: {
    id: 'satellite',
    name: 'Esri Satellite Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
  },
  streets: {
    id: 'streets',
    name: 'OpenStreetMap Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  dark: {
    id: 'dark',
    name: 'CartoDB Dark Matter',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  },
};

export const gisService = {
  /**
   * Load GeoJSON cadastral dataset
   */
  async getCadastralGeoJSON() {
    return parcelsGeoJson;
  },

  /**
   * Enrich GeoJSON feature properties with owner and valuation data from mock database
   */
  getEnrichedFeature(feature) {
    if (!feature || !feature.properties) return feature;
    const parcelId = feature.properties.parcel_id;
    const mockData = mockParcels.find((p) => p.parcel_id === parcelId);
    const owner = mockOwners.find((o) => o.parcel_id === parcelId && o.is_primary);

    return {
      ...feature,
      properties: {
        ...feature.properties,
        ...(mockData || {}),
        primary_owner: owner ? owner.full_name : 'State / Unspecified',
      },
    };
  },

  /**
   * Base polygon styling by parcel status
   */
  getParcelStyle(feature, isSelected = false) {
    const status = feature?.properties?.status || 'Active';

    if (isSelected) {
      return {
        fillColor: '#38bdf8',
        weight: 3.5,
        opacity: 1,
        color: '#00f2fe',
        dashArray: '',
        fillOpacity: 0.65,
      };
    }

    switch (status) {
      case 'Disputed':
        return {
          fillColor: '#ef4444',
          weight: 2.5,
          opacity: 0.9,
          color: '#f87171',
          dashArray: '',
          fillOpacity: 0.45,
        };
      case 'Pending Mutation':
        return {
          fillColor: '#f59e0b',
          weight: 2,
          opacity: 0.9,
          color: '#fbbf24',
          dashArray: '5, 5',
          fillOpacity: 0.4,
        };
      case 'Locked':
        return {
          fillColor: '#8b5cf6',
          weight: 2,
          opacity: 0.9,
          color: '#c084fc',
          dashArray: '',
          fillOpacity: 0.4,
        };
      case 'Active':
      default:
        return {
          fillColor: '#10b981',
          weight: 2,
          opacity: 0.85,
          color: '#34d399',
          dashArray: '',
          fillOpacity: 0.35,
        };
    }
  },

  /**
   * Hover styling for responsive feedback
   */
  getHoverStyle(isSelected = false) {
    if (isSelected) {
      return {
        weight: 4,
        color: '#ffffff',
        fillColor: '#38bdf8',
        fillOpacity: 0.75,
      };
    }
    return {
      weight: 3,
      color: '#38bdf8',
      dashArray: '',
      fillOpacity: 0.55,
    };
  },

  /**
   * Compute Leaflet LatLng bounds for an array of coordinates or GeoJSON feature
   */
  getFeatureBounds(feature) {
    if (!feature || !feature.geometry || !feature.geometry.coordinates) return null;
    const coords = feature.geometry.coordinates[0]; // Polygon ring [lng, lat]
    if (!coords || !coords.length) return null;

    let minLat = 90;
    let maxLat = -90;
    let minLng = 180;
    let maxLng = -180;

    coords.forEach(([lng, lat]) => {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    });

    return [
      [minLat, minLng],
      [maxLat, maxLng],
    ];
  },

  /**
   * Calculate polygon center centroid [lat, lng]
   */
  getFeatureCenter(feature) {
    const bounds = this.getFeatureBounds(feature);
    if (!bounds) return null;
    const [[minLat, minLng], [maxLat, maxLng]] = bounds;
    return [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
  },
};
