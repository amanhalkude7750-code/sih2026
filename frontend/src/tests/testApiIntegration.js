/**
 * Verification Script for Module 9: Backend API Integration
 * Tests every major frontend API flow and error handling contract
 */

import { parcelService } from '../services/parcelService.js';
import { gisService } from '../services/gisService.js';

async function runTests() {
  console.log('--- STARTING MODULE 9 API INTEGRATION VERIFICATION ---');
  let passed = 0;
  let failed = 0;

  async function assertTest(name, fn) {
    try {
      await fn();
      console.log(`  [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${name}:`, err.message || err);
      failed++;
    }
  }

  // 1. GET /api/parcels
  await assertTest('GET /api/parcels returns list of parcels with success: true', async () => {
    const res = await parcelService.getParcels();
    if (!res.success || !Array.isArray(res.data) || res.data.length === 0) {
      throw new Error(`Expected array of parcels, got: ${JSON.stringify(res)}`);
    }
  });

  // 2. GET /api/parcels?search={query}
  await assertTest('GET /api/parcels?search=124/2 filters correctly', async () => {
    const res = await parcelService.getParcels({ search: '124/2' });
    if (!res.success || res.data.length === 0 || res.data[0].parcel_id !== 'P001') {
      throw new Error(`Search failed to find P001 by survey 124/2: ${JSON.stringify(res.data)}`);
    }
  });

  // 3. GET /api/parcels/{parcel_id}
  await assertTest('GET /api/parcels/{parcel_id} returns valid parcel entity', async () => {
    const res = await parcelService.getParcelById('P001');
    if (!res.success || res.data.parcel_id !== 'P001') {
      throw new Error(`Failed to retrieve parcel P001: ${JSON.stringify(res)}`);
    }
  });

  // 4. Invalid parcel ID error handling
  await assertTest('GET /api/parcels/INVALID returns RESOURCE_NOT_FOUND error', async () => {
    try {
      await parcelService.getParcelById('NON_EXISTENT_PARCEL_999');
      throw new Error('Should have thrown RESOURCE_NOT_FOUND error');
    } catch (err) {
      if (err.code !== 'RESOURCE_NOT_FOUND') {
        throw new Error(`Expected error code RESOURCE_NOT_FOUND, got: ${err.code}`);
      }
    }
  });

  // 5. Empty parcel ID validation
  await assertTest('GET /api/parcels/"" rejects empty parcel ID with INVALID_PARCEL_ID', async () => {
    try {
      await parcelService.getParcelById('');
      throw new Error('Should have thrown INVALID_PARCEL_ID');
    } catch (err) {
      if (err.code !== 'INVALID_PARCEL_ID') {
        throw new Error(`Expected error code INVALID_PARCEL_ID, got: ${err.code}`);
      }
    }
  });

  // 6. GET /api/parcels/{parcel_id}/documents
  await assertTest('GET /api/parcels/{parcel_id}/documents returns document list', async () => {
    const res = await parcelService.getParcelDocuments('P001');
    if (!res.success || !Array.isArray(res.data)) {
      throw new Error(`Expected documents array: ${JSON.stringify(res)}`);
    }
  });

  // 7. GET /api/parcels/{parcel_id}/transactions
  await assertTest('GET /api/parcels/{parcel_id}/transactions returns transaction list', async () => {
    const res = await parcelService.getParcelTransactions('P001');
    if (!res.success || !Array.isArray(res.data)) {
      throw new Error(`Expected transactions array: ${JSON.stringify(res)}`);
    }
  });

  // 8. GET /api/parcels/{parcel_id}/disputes
  await assertTest('GET /api/parcels/{parcel_id}/disputes returns disputes list', async () => {
    const res = await parcelService.getParcelDisputes('P003');
    if (!res.success || !Array.isArray(res.data) || res.data.length === 0) {
      throw new Error(`Expected disputes array for P003: ${JSON.stringify(res)}`);
    }
  });

  // 9. GET /api/parcels/{parcel_id}/audit
  await assertTest('GET /api/parcels/{parcel_id}/audit returns audit entries', async () => {
    const res = await parcelService.getParcelAuditTrail('P001');
    if (!res.success || !Array.isArray(res.data) || res.data.length === 0) {
      throw new Error(`Expected audit trail array: ${JSON.stringify(res)}`);
    }
  });

  // 10. Unified Master Aggregation
  await assertTest('getUnifiedParcelView aggregates parcel, documents, transactions, disputes, audit', async () => {
    const res = await parcelService.getUnifiedParcelView('P001');
    if (
      !res.success ||
      !res.data.parcel ||
      !Array.isArray(res.data.documents) ||
      !Array.isArray(res.data.transactions) ||
      !Array.isArray(res.data.disputes) ||
      !Array.isArray(res.data.auditTrail)
    ) {
      throw new Error(`Unified aggregation incomplete: ${JSON.stringify(res.data)}`);
    }
  });

  // 11. GIS GeoJSON Consumption
  await assertTest('gisService.getCadastralGeoJSON returns valid GeoJSON FeatureCollection', async () => {
    const geo = await gisService.getCadastralGeoJSON();
    if (geo.type !== 'FeatureCollection' || !Array.isArray(geo.features)) {
      throw new Error(`Expected FeatureCollection, got: ${geo.type}`);
    }
  });

  console.log(`\n--- TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
