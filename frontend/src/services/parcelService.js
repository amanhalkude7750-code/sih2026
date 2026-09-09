/**
 * Parcel Service Abstraction
 * 
 * Implements the core product philosophy:
 * "One Parcel -> One Unified View -> Faster Land Governance Decisions"
 * 
 * Provides unified access to parcels, ownership, statutory records, documents,
 * disputes, transactions, and audit trail.
 * Reads from centralized mock data now; seamlessly connects to REST backend in future modules.
 */

import { ENV, API_ENDPOINTS } from '../config/env.js';
import { api } from './api.js';
import {
  mockParcels,
  mockOwners,
  mockLandRecords,
  mockDocuments,
  mockTransactions,
  mockDisputes,
  mockAuditEntries,
} from '../data/mock/index.js';

// Simulated latency for realistic async state handling in UI
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const parcelService = {
  /**
   * Fetch all parcels with optional filtering and search
   */
  async getParcels(filters = {}) {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      let results = [...mockParcels];

      if (filters.status && filters.status !== 'All') {
        results = results.filter((p) => p.status === filters.status);
      }
      if (filters.land_use && filters.land_use !== 'All') {
        results = results.filter((p) => p.land_use === filters.land_use);
      }
      if (filters.taluka && filters.taluka !== 'All') {
        results = results.filter((p) => p.taluka.toLowerCase() === filters.taluka.toLowerCase());
      }
      if (filters.village) {
        results = results.filter((p) =>
          p.village.toLowerCase().includes(filters.village.toLowerCase())
        );
      }
      if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        results = results.filter(
          (p) =>
            p.parcel_id.toLowerCase().includes(query) ||
            p.survey_number.toLowerCase().includes(query) ||
            p.village.toLowerCase().includes(query) ||
            (p.ulpin && p.ulpin.toLowerCase().includes(query))
        );
      }

      return {
        data: results,
        total: results.length,
        status: 'success',
      };
    }

    return await api.get(API_ENDPOINTS.PARCELS, filters);
  },

  /**
   * Get single parcel by parcel_id
   */
  async getParcelById(parcelId) {
    if (!parcelId) throw new Error('parcel_id is required');

    if (ENV.USE_MOCK_DATA) {
      await delay();
      const parcel = mockParcels.find(
        (p) => p.parcel_id.toUpperCase() === parcelId.toUpperCase()
      );
      if (!parcel) {
        throw new Error(`Parcel with ID "${parcelId}" not found.`);
      }
      return { data: parcel, status: 'success' };
    }

    return await api.get(API_ENDPOINTS.PARCEL_BY_ID(parcelId));
  },

  /**
   * Fetch Unified Parcel View (Aggregated Master Domain Model)
   * Central entry point for "One Parcel -> One Unified View"
   */
  async getUnifiedParcelView(parcelId) {
    if (!parcelId) throw new Error('parcel_id is required');

    if (ENV.USE_MOCK_DATA) {
      await delay();
      const parcel = mockParcels.find(
        (p) => p.parcel_id.toUpperCase() === parcelId.toUpperCase()
      );

      if (!parcel) {
        throw new Error(`Parcel with ID "${parcelId}" not found.`);
      }

      const id = parcel.parcel_id;
      const owners = mockOwners.filter((o) => o.parcel_id === id);
      const landRecords = mockLandRecords.filter((r) => r.parcel_id === id);
      const documents = mockDocuments.filter((d) => d.parcel_id === id);
      const transactions = mockTransactions.filter((t) => t.parcel_id === id);
      const disputes = mockDisputes.filter((d) => d.parcel_id === id);
      const auditTrail = mockAuditEntries.filter((a) => a.parcel_id === id);

      return {
        data: {
          parcel,
          owners,
          landRecords,
          documents,
          transactions,
          disputes,
          auditTrail,
        },
        status: 'success',
      };
    }

    return await api.get(API_ENDPOINTS.PARCEL_UNIFIED_VIEW(parcelId));
  },

  /**
   * Fetch Owners for a parcel
   */
  async getParcelOwners(parcelId) {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      const owners = mockOwners.filter((o) => o.parcel_id === parcelId);
      return { data: owners, total: owners.length, status: 'success' };
    }
    return await api.get(API_ENDPOINTS.OWNERS_BY_PARCEL(parcelId));
  },

  /**
   * Fetch Statutory Land Records for a parcel
   */
  async getParcelRecords(parcelId) {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      const records = mockLandRecords.filter((r) => r.parcel_id === parcelId);
      return { data: records, total: records.length, status: 'success' };
    }
    return await api.get(API_ENDPOINTS.RECORDS_BY_PARCEL(parcelId));
  },

  /**
   * Fetch Documents for a parcel
   */
  async getParcelDocuments(parcelId) {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      const docs = mockDocuments.filter((d) => d.parcel_id === parcelId);
      return { data: docs, total: docs.length, status: 'success' };
    }
    return await api.get(API_ENDPOINTS.DOCUMENTS_BY_PARCEL(parcelId));
  },

  /**
   * Fetch Transactions for a parcel
   */
  async getParcelTransactions(parcelId) {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      const txns = mockTransactions.filter((t) => t.parcel_id === parcelId);
      return { data: txns, total: txns.length, status: 'success' };
    }
    return await api.get(API_ENDPOINTS.TRANSACTIONS_BY_PARCEL(parcelId));
  },

  /**
   * Fetch Disputes for a parcel
   */
  async getParcelDisputes(parcelId) {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      const disputes = mockDisputes.filter((d) => d.parcel_id === parcelId);
      return { data: disputes, total: disputes.length, status: 'success' };
    }
    return await api.get(API_ENDPOINTS.DISPUTES_BY_PARCEL(parcelId));
  },

  /**
   * Fetch Tamper-Evident Audit Trail for a parcel
   */
  async getParcelAuditTrail(parcelId) {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      const audit = mockAuditEntries.filter((a) => a.parcel_id === parcelId);
      return { data: audit, total: audit.length, status: 'success' };
    }
    return await api.get(API_ENDPOINTS.AUDIT_BY_PARCEL(parcelId));
  },

  /**
   * Get High-Level Governance Analytics & Metrics
   */
  async getGovernanceStats() {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      const totalParcels = mockParcels.length;
      const totalAreaHectares = mockParcels.reduce((acc, p) => acc + (p.area || 0), 0);
      const activeDisputes = mockDisputes.filter((d) => d.status !== 'Disposed / Resolved').length;
      const pendingMutations = mockParcels.filter((p) => p.status === 'Pending Mutation').length;
      const verifiedRecords = mockLandRecords.filter((r) => r.digital_signature_verified).length;
      const totalValuation = mockParcels.reduce((acc, p) => acc + (p.market_valuation_inr || 0), 0);

      return {
        data: {
          totalParcels,
          totalAreaHectares: parseFloat(totalAreaHectares.toFixed(2)),
          activeDisputes,
          pendingMutations,
          verifiedRecords,
          totalValuation,
        },
        status: 'success',
      };
    }

    return await api.get('/stats/governance');
  },

  /**
   * Universal Search (by parcel_id, survey_no, village, or owner name)
   */
  async search(term) {
    if (!term || !term.trim()) return { data: [], total: 0 };
    const query = term.toLowerCase().trim();

    if (ENV.USE_MOCK_DATA) {
      await delay();
      // Find matching owners first
      const matchingOwnerParcelIds = new Set(
        mockOwners
          .filter((o) => o.full_name.toLowerCase().includes(query))
          .map((o) => o.parcel_id)
      );

      const matchedParcels = mockParcels.filter(
        (p) =>
          p.parcel_id.toLowerCase().includes(query) ||
          p.survey_number.toLowerCase().includes(query) ||
          p.village.toLowerCase().includes(query) ||
          p.taluka.toLowerCase().includes(query) ||
          matchingOwnerParcelIds.has(p.parcel_id)
      );

      return {
        data: matchedParcels,
        total: matchedParcels.length,
        status: 'success',
      };
    }

    return await api.get(API_ENDPOINTS.SEARCH, { q: query });
  },
};
