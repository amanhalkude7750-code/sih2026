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
      const activeParcels = mockParcels.filter((p) => p.status === 'Active').length;
      const disputedParcels = mockParcels.filter((p) => p.status === 'Disputed').length;
      const pendingMutations = mockParcels.filter((p) => p.status === 'Pending Mutation').length;
      const pendingRecords = mockLandRecords.filter((r) => !r.digital_signature_verified || r.status === 'Under Mutation' || r.status === 'Draft').length + pendingMutations;
      const totalTransactions = mockTransactions.length;
      const totalAreaHectares = mockParcels.reduce((acc, p) => acc + (p.area || 0), 0);
      const activeDisputes = mockDisputes.filter((d) => d.status !== 'Disposed / Resolved' && d.status !== 'Resolved').length;
      const verifiedRecords = mockLandRecords.filter((r) => r.digital_signature_verified).length;
      const totalValuation = mockParcels.reduce((acc, p) => acc + (p.market_valuation_inr || 0), 0);

      return {
        data: {
          totalParcels,
          activeParcels,
          disputedParcels,
          pendingMutations,
          pendingRecords,
          totalTransactions,
          totalAreaHectares: parseFloat(totalAreaHectares.toFixed(2)),
          activeDisputes,
          verifiedRecords,
          totalValuation,
        },
        status: 'success',
      };
    }

    return await api.get('/stats/governance');
  },

  /**
   * Fetch Combined Recent Activity Stream (Audit Events & Transactions)
   */
  async getRecentActivity(limit = 6) {
    if (ENV.USE_MOCK_DATA) {
      await delay();
      const events = [
        ...mockAuditEntries.map((a) => ({
          id: a.audit_id,
          parcel_id: a.parcel_id,
          type: 'AUDIT',
          action: a.action,
          actor: a.actor || a.performed_by || 'Officer',
          role: a.role || a.user_role || 'Authority',
          description: a.description || a.changes_summary,
          timestamp: a.timestamp,
        })),
        ...mockTransactions.map((t) => ({
          id: t.transaction_id,
          parcel_id: t.parcel_id,
          type: 'TRANSACTION',
          action: t.transaction_type,
          actor: t.from_party,
          role: 'Sub-Registrar SRO',
          description: `Transferred to ${t.to_party} (Reg #${t.registration_number})`,
          timestamp: t.transaction_date,
        })),
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      return { data: events.slice(0, limit), status: 'success' };
    }

    return await api.get('/activity/recent');
  },

  /**
   * Universal Search (by parcel_id, survey_no, village, or owner name)
   */
  async search(term) {
    if (!term || !term.trim()) return { data: [], total: 0 };
    const query = term.toLowerCase().trim();

    if (ENV.USE_MOCK_DATA) {
      const matchingOwnerMap = new Map();
      mockOwners.forEach((o) => {
        if (o.full_name.toLowerCase().includes(query)) {
          matchingOwnerMap.set(o.parcel_id, o.full_name);
        }
      });

      const matchedParcels = mockParcels
        .filter(
          (p) =>
            p.parcel_id.toLowerCase().includes(query) ||
            p.survey_number.toLowerCase().includes(query) ||
            p.village.toLowerCase().includes(query) ||
            p.taluka.toLowerCase().includes(query) ||
            matchingOwnerMap.has(p.parcel_id)
        )
        .map((p) => {
          const primaryOwner = mockOwners.find((o) => o.parcel_id === p.parcel_id && o.is_primary);
          let matchReason = 'Parcel Match';
          if (p.parcel_id.toLowerCase() === query) {
            matchReason = `Exact ID: ${p.parcel_id}`;
          } else if (p.survey_number.toLowerCase().includes(query)) {
            matchReason = `Survey #${p.survey_number}`;
          } else if (matchingOwnerMap.has(p.parcel_id)) {
            matchReason = `Owner: ${matchingOwnerMap.get(p.parcel_id)}`;
          } else if (p.village.toLowerCase().includes(query)) {
            matchReason = `Village: ${p.village}`;
          } else if (p.taluka.toLowerCase().includes(query)) {
            matchReason = `Taluka: ${p.taluka}`;
          }

          return {
            ...p,
            primary_owner: primaryOwner ? primaryOwner.full_name : matchingOwnerMap.get(p.parcel_id) || 'State / Common',
            match_reason: matchReason,
          };
        });

      return {
        data: matchedParcels,
        total: matchedParcels.length,
        status: 'success',
      };
    }

    return await api.get(API_ENDPOINTS.SEARCH, { q: query });
  },
};
