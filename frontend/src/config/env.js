/**
 * Central Environment & API Configuration
 * 
 * Provides runtime configuration with fallback to mock data mode.
 * In future modules, when backend REST APIs are active, switching `USE_MOCK_DATA`
 * or pointing `VITE_API_BASE_URL` in `.env` connects seamlessly.
 */

export const ENV = {
  // Mode flag: true uses localized mock database, false connects to REST backend
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
  
  // Base URLs for REST APIs
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  
  // Request Timeout in ms
  API_TIMEOUT_MS: 15000,
  
  // GIS Configuration
  GIS: {
    DEFAULT_CENTER: [18.4088, 76.5604], // Latur, Maharashtra
    DEFAULT_ZOOM: 13,
    MAX_ZOOM: 19,
    TILE_PROVIDER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    SATELLITE_TILE_URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
  
  // Application Meta
  APP_NAME: 'GeoLand DPI',
  APP_VERSION: '1.0.0-alpha',
  APP_MOTTO: 'One Parcel -> One Unified View -> Faster Land Governance Decisions',
};

export const API_ENDPOINTS = {
  PARCELS: '/parcels',
  PARCEL_BY_ID: (id) => `/parcels/${id}`,
  PARCEL_UNIFIED_VIEW: (id) => `/parcels/${id}/unified`,
  OWNERS_BY_PARCEL: (id) => `/parcels/${id}/owners`,
  RECORDS_BY_PARCEL: (id) => `/parcels/${id}/records`,
  DOCUMENTS_BY_PARCEL: (id) => `/parcels/${id}/documents`,
  TRANSACTIONS_BY_PARCEL: (id) => `/parcels/${id}/transactions`,
  DISPUTES_BY_PARCEL: (id) => `/parcels/${id}/disputes`,
  AUDIT_BY_PARCEL: (id) => `/parcels/${id}/audit`,
  SEARCH: '/search',
  GEOJSON: '/parcels/geojson',
};
