/**
 * Central Environment & API Configuration
 * 
 * Provides runtime configuration with fallback to mock data mode.
 * In future modules, when backend REST APIs are active, switching `USE_MOCK_DATA`
 * or pointing `VITE_API_BASE_URL` in `.env` connects seamlessly.
 */

export const ENV = {
  // Mode flag: true uses localized mock database, false connects to REST backend
  USE_MOCK_DATA: typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env.VITE_USE_MOCK_DATA === 'true' || import.meta.env.VITE_USE_MOCK_DATA === undefined) : true,
  
  // Base URLs for REST APIs (defaulting to /api)
  API_BASE_URL: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'http://localhost:5000/api',
  
  // Request Timeout in ms
  API_TIMEOUT_MS: 12000,

  // Fallback to local data if backend connection fails (guarantees zero demo failures)
  FALLBACK_ON_NETWORK_ERROR: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FALLBACK_ON_NETWORK_ERROR !== 'false' : true,
  
  // GIS Configuration
  GIS: {
    DEFAULT_CENTER: [18.4088, 76.5604], // Latur, Maharashtra
    DEFAULT_ZOOM: 13,
    MAX_ZOOM: 19,
    TILE_PROVIDER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    SATELLITE_TILE_URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
  
  // Application Meta
  APP_NAME: 'LANDSTACK',
  APP_VERSION: '1.0.0-dpi',
  APP_MOTTO: 'Bridging the gap between complex land systems and ground-level realities to ensure land governance is inclusive, transparent, and just.',
};

export const API_ENDPOINTS = {
  PARCELS: '/parcels',
  PARCEL_BY_ID: (id) => `/parcels/${id}`,
  PARCEL_DOCUMENTS: (id) => `/parcels/${id}/documents`,
  PARCEL_TRANSACTIONS: (id) => `/parcels/${id}/transactions`,
  PARCEL_DISPUTES: (id) => `/parcels/${id}/disputes`,
  PARCEL_AUDIT: (id) => `/parcels/${id}/audit`,
  PARCEL_OWNERS: (id) => `/parcels/${id}/owners`,
  PARCEL_RECORDS: (id) => `/parcels/${id}/records`,
  PARCEL_UNIFIED_VIEW: (id) => `/parcels/${id}/unified`,
  DOCUMENTS_BY_PARCEL: (id) => `/parcels/${id}/documents`,
  TRANSACTIONS_BY_PARCEL: (id) => `/parcels/${id}/transactions`,
  DISPUTES_BY_PARCEL: (id) => `/parcels/${id}/disputes`,
  AUDIT_BY_PARCEL: (id) => `/parcels/${id}/audit`,
  OWNERS_BY_PARCEL: (id) => `/parcels/${id}/owners`,
  RECORDS_BY_PARCEL: (id) => `/parcels/${id}/records`,
  SEARCH: '/parcels',
  GEOJSON: '/parcels/geojson',
};
