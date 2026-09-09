/**
 * Domain Constants & UI Mapping
 */

export const PARCEL_STATUS_MAP = {
  Active: {
    label: 'Active / Clear Title',
    variant: 'success',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  'Pending Mutation': {
    label: 'Pending Mutation (Ferfar)',
    variant: 'warning',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  Disputed: {
    label: 'Litigation / Disputed',
    variant: 'danger',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  Locked: {
    label: 'Govt / Eco-Locked',
    variant: 'neutral',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  Archived: {
    label: 'Archived Record',
    variant: 'secondary',
    color: '#64748b',
    bgColor: 'rgba(100, 116, 139, 0.12)',
    borderColor: 'rgba(100, 116, 139, 0.3)',
  },
};

export const LAND_USE_MAP = {
  Agricultural: {
    icon: 'Wheat',
    color: '#22c55e',
    badge: 'agri-badge',
  },
  Residential: {
    icon: 'Home',
    color: '#3b82f6',
    badge: 'res-badge',
  },
  Commercial: {
    icon: 'Building2',
    color: '#f59e0b',
    badge: 'comm-badge',
  },
  Industrial: {
    icon: 'Factory',
    color: '#ec4899',
    badge: 'ind-badge',
  },
  'Forest / Eco-Sensitive': {
    icon: 'Trees',
    color: '#14b8a6',
    badge: 'forest-badge',
  },
};

export const TALUKAS_LATUR = [
  'All',
  'Ausa',
  'Latur',
  'Nilanga',
  'Renapur',
  'Udgir',
  'Ahmedpur',
  'Chakur',
  'Deoni',
  'Jalkot',
  'Shirur Anantpal',
];
