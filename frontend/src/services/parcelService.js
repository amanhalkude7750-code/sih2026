/**
 * Parcel Service Abstraction (API Integration Boundary)
 * 
 * Implements the core product philosophy:
 * "One Parcel -> One Unified View -> Faster Land Governance Decisions"
 * 
 * Connects frontend to backend REST APIs conforming to the expected contracts:
 * - GET /api/parcels?search={query}
 * - GET /api/parcels/{parcel_id}
 * - GET /api/parcels/{parcel_id}/documents
 * - GET /api/parcels/{parcel_id}/transactions
 * - GET /api/parcels/{parcel_id}/disputes
 * - GET /api/parcels/{parcel_id}/audit
 * 
 * Handles:
 * - Loading, structured success ({ success: true, data: ... })
 * - Error responses ({ success: false, error: { code, message } })
 * - Empty responses & array normalization
 * - Network failures with optional resilience fallback
 * - Invalid parcel IDs
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

// Simulated latency for realistic async state handling when using mock mode
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Standard error factory matching the expected backend error contract
 */
function createApiError(code, message, status = 400) {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  error.success = false;
  return error;
}

export const parcelService = {
  /**
   * Fetch all parcels with optional search query and filters
   * Contract: GET /api/parcels?search={query}
   */
  async getParcels(filters = {}) {
    const searchQuery = filters.search || filters.q;

    if (!ENV.USE_MOCK_DATA) {
      try {
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (filters.status && filters.status !== 'All') params.status = filters.status;
        if (filters.land_use && filters.land_use !== 'All') params.land_use = filters.land_use;

        const res = await api.get(API_ENDPOINTS.PARCELS, params);
        const data = Array.isArray(res.data) ? res.data : res.data?.parcels || [];
        return {
          success: true,
          data,
          total: data.length,
          status: 'success',
        };
      } catch (err) {
        console.warn(`[parcelService.getParcels] Backend API request failed:`, err.message);
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) {
          throw err;
        }
        // Fallback gracefully on network failure
        console.info('[parcelService] Falling back to local verified parcel registry');
      }
    }

    // Mock implementation
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
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.parcel_id.toLowerCase().includes(query) ||
          p.survey_number.toLowerCase().includes(query) ||
          p.village.toLowerCase().includes(query) ||
          (p.ulpin && p.ulpin.toLowerCase().includes(query))
      );
    }

    return {
      success: true,
      data: results,
      total: results.length,
      status: 'success',
    };
  },

  /**
   * Get single parcel by parcel_id
   * Contract: GET /api/parcels/{parcel_id}
   */
  async getParcelById(parcelId) {
    if (!parcelId || typeof parcelId !== 'string' || !parcelId.trim()) {
      throw createApiError('INVALID_PARCEL_ID', 'A valid parcel_id is required', 400);
    }

    const cleanId = parcelId.trim();

    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get(API_ENDPOINTS.PARCEL_BY_ID(cleanId));
        if (!res.data) {
          throw createApiError('RESOURCE_NOT_FOUND', `Parcel with ID "${cleanId}" not found`, 404);
        }
        return {
          success: true,
          data: res.data,
          status: 'success',
        };
      } catch (err) {
        // If it's a 404 not found, do not fall back to mock — properly report RESOURCE_NOT_FOUND
        if (err.code === 'RESOURCE_NOT_FOUND' || err.status === 404) {
          throw err;
        }
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) {
          throw err;
        }
        console.warn(`[parcelService.getParcelById] Backend unreachable for ${cleanId}, falling back to local registry`);
      }
    }

    // Mock implementation
    await delay();
    const parcel = mockParcels.find(
      (p) => p.parcel_id.toUpperCase() === cleanId.toUpperCase()
    );

    if (!parcel) {
      throw createApiError('RESOURCE_NOT_FOUND', `Parcel not found`, 404);
    }

    return {
      success: true,
      data: parcel,
      status: 'success',
    };
  },

  /**
   * Fetch Documents for a parcel
   * Contract: GET /api/parcels/{parcel_id}/documents
   */
  async getParcelDocuments(parcelId) {
    if (!parcelId) throw createApiError('INVALID_PARCEL_ID', 'parcel_id is required');
    const cleanId = parcelId.trim();

    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get(API_ENDPOINTS.DOCUMENTS_BY_PARCEL(cleanId));
        const docs = Array.isArray(res.data) ? res.data : [];
        return {
          success: true,
          data: docs,
          total: docs.length,
          status: 'success',
        };
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) {
          throw err;
        }
      }
    }

    await delay();
    const docs = mockDocuments.filter((d) => d.parcel_id.toUpperCase() === cleanId.toUpperCase());
    return {
      success: true,
      data: docs,
      total: docs.length,
      status: 'success',
    };
  },

  /**
   * Fetch Transactions for a parcel
   * Contract: GET /api/parcels/{parcel_id}/transactions
   */
  async getParcelTransactions(parcelId) {
    if (!parcelId) throw createApiError('INVALID_PARCEL_ID', 'parcel_id is required');
    const cleanId = parcelId.trim();

    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get(API_ENDPOINTS.TRANSACTIONS_BY_PARCEL(cleanId));
        const txns = Array.isArray(res.data) ? res.data : [];
        return {
          success: true,
          data: txns,
          total: txns.length,
          status: 'success',
        };
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) {
          throw err;
        }
      }
    }

    await delay();
    const txns = mockTransactions.filter((t) => t.parcel_id.toUpperCase() === cleanId.toUpperCase());
    return {
      success: true,
      data: txns,
      total: txns.length,
      status: 'success',
    };
  },

  /**
   * Fetch Disputes for a parcel
   * Contract: GET /api/parcels/{parcel_id}/disputes
   */
  async getParcelDisputes(parcelId) {
    if (!parcelId) throw createApiError('INVALID_PARCEL_ID', 'parcel_id is required');
    const cleanId = parcelId.trim();

    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get(API_ENDPOINTS.DISPUTES_BY_PARCEL(cleanId));
        const disputes = Array.isArray(res.data) ? res.data : [];
        return {
          success: true,
          data: disputes,
          total: disputes.length,
          status: 'success',
        };
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) {
          throw err;
        }
      }
    }

    await delay();
    const disputes = mockDisputes.filter((d) => d.parcel_id.toUpperCase() === cleanId.toUpperCase());
    return {
      success: true,
      data: disputes,
      total: disputes.length,
      status: 'success',
    };
  },

  /**
   * Fetch Audit Trail for a parcel
   * Contract: GET /api/parcels/{parcel_id}/audit
   */
  async getParcelAuditTrail(parcelId) {
    if (!parcelId) throw createApiError('INVALID_PARCEL_ID', 'parcel_id is required');
    const cleanId = parcelId.trim();

    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get(API_ENDPOINTS.AUDIT_BY_PARCEL(cleanId));
        const audit = Array.isArray(res.data) ? res.data : [];
        return {
          success: true,
          data: audit,
          total: audit.length,
          status: 'success',
        };
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) {
          throw err;
        }
      }
    }

    await delay();
    const audit = mockAuditEntries.filter((a) => a.parcel_id.toUpperCase() === cleanId.toUpperCase());
    return {
      success: true,
      data: audit,
      total: audit.length,
      status: 'success',
    };
  },

  /**
   * Fetch All Audit Logs across cadastral parcels
   */
  async getAllAuditLogs() {
    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get('/audit');
        const logs = Array.isArray(res.data) ? res.data : [];
        return { success: true, data: logs, total: logs.length, status: 'success' };
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) throw err;
      }
    }

    await delay();
    return { success: true, data: mockAuditEntries, total: mockAuditEntries.length, status: 'success' };
  },

  /**
   * Fetch Unified Parcel View (Aggregated Single Pane of Glass)
   * Integrates parcel details, statutory records, documents, transactions, disputes, and audit
   */
  async getUnifiedParcelView(parcelId) {
    if (!parcelId) throw createApiError('INVALID_PARCEL_ID', 'parcel_id is required');
    const cleanId = parcelId.trim();

    // 1. Fetch core parcel details (will throw RESOURCE_NOT_FOUND if invalid)
    const parcelRes = await this.getParcelById(cleanId);
    const parcel = parcelRes.data;

    // 2. Fetch all related modules concurrently through the service layer integration boundary
    const [docsRes, txnsRes, disputesRes, auditRes] = await Promise.all([
      this.getParcelDocuments(cleanId).catch(() => ({ data: [] })),
      this.getParcelTransactions(cleanId).catch(() => ({ data: [] })),
      this.getParcelDisputes(cleanId).catch(() => ({ data: [] })),
      this.getParcelAuditTrail(cleanId).catch(() => ({ data: [] })),
    ]);

    // Owners and statutory records
    const owners = mockOwners.filter((o) => o.parcel_id.toUpperCase() === cleanId.toUpperCase());
    const landRecords = mockLandRecords.filter((r) => r.parcel_id.toUpperCase() === cleanId.toUpperCase());

    return {
      success: true,
      data: {
        parcel,
        owners,
        landRecords,
        documents: docsRes.data || [],
        transactions: txnsRes.data || [],
        disputes: disputesRes.data || [],
        auditTrail: auditRes.data || [],
      },
      status: 'success',
    };
  },

  /**
   * Fetch Owners for a parcel
   */
  async getParcelOwners(parcelId) {
    if (!parcelId) throw createApiError('INVALID_PARCEL_ID', 'parcel_id is required');
    const cleanId = parcelId.trim();

    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get(API_ENDPOINTS.OWNERS_BY_PARCEL(cleanId));
        return { success: true, data: res.data || [], status: 'success' };
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) throw err;
      }
    }

    await delay();
    const owners = mockOwners.filter((o) => o.parcel_id.toUpperCase() === cleanId.toUpperCase());
    return { success: true, data: owners, total: owners.length, status: 'success' };
  },

  /**
   * Fetch Statutory Land Records for a parcel
   */
  async getParcelRecords(parcelId) {
    if (!parcelId) throw createApiError('INVALID_PARCEL_ID', 'parcel_id is required');
    const cleanId = parcelId.trim();

    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get(API_ENDPOINTS.RECORDS_BY_PARCEL(cleanId));
        return { success: true, data: res.data || [], status: 'success' };
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) throw err;
      }
    }

    await delay();
    const records = mockLandRecords.filter((r) => r.parcel_id.toUpperCase() === cleanId.toUpperCase());
    return { success: true, data: records, total: records.length, status: 'success' };
  },

  /**
   * Universal Search (Contract: GET /api/parcels?search={query})
   */
  async search(term) {
    if (!term || !term.trim()) return { success: true, data: [], total: 0 };
    const query = term.toLowerCase().trim();

    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get(API_ENDPOINTS.PARCELS, { search: query });
        const items = Array.isArray(res.data) ? res.data : res.data?.parcels || [];
        return {
          success: true,
          data: items,
          total: items.length,
          status: 'success',
        };
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) throw err;
      }
    }

    // Mock search logic
    await delay(80);
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
      success: true,
      data: matchedParcels,
      total: matchedParcels.length,
      status: 'success',
    };
  },

  /**
   * High-Level Operational Metrics & Governance Analytics
   */
  async getGovernanceStats() {
    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get('/stats/governance');
        if (res.data) {
          return { success: true, data: res.data, status: 'success' };
        }
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) throw err;
      }
    }

    await delay();
    const totalParcels = mockParcels.length;
    const activeParcels = mockParcels.filter((p) => p.status === 'Active').length;
    const disputedParcels = mockParcels.filter((p) => p.status === 'Disputed').length;
    const pendingMutations = mockParcels.filter((p) => p.status === 'Pending Mutation').length;
    const pendingRecords =
      mockLandRecords.filter(
        (r) => !r.digital_signature_verified || r.status === 'Under Mutation' || r.status === 'Draft'
      ).length + pendingMutations;
    const totalTransactions = mockTransactions.length;
    const totalAreaHectares = mockParcels.reduce((acc, p) => acc + (p.area || 0), 0);
    const activeDisputes = mockDisputes.filter(
      (d) => d.status !== 'Disposed / Resolved' && d.status !== 'Resolved'
    ).length;
    const verifiedRecords = mockLandRecords.filter((r) => r.digital_signature_verified).length;
    const totalValuation = mockParcels.reduce((acc, p) => acc + (p.market_valuation_inr || 0), 0);

    return {
      success: true,
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
  },

  /**
   * Fetch Combined Recent Activity Stream
   */
  async getRecentActivity(limit = 6) {
    if (!ENV.USE_MOCK_DATA) {
      try {
        const res = await api.get('/activity/recent', { limit });
        if (res.data) {
          return { success: true, data: res.data, status: 'success' };
        }
      } catch (err) {
        if (!ENV.FALLBACK_ON_NETWORK_ERROR || !err.isNetworkError) throw err;
      }
    }

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

    return { success: true, data: events.slice(0, limit), status: 'success' };
  },
};
