import { useState, useEffect, useCallback } from 'react';
import { parcelService } from '../services/parcelService.js';

export function useParcelDetail(parcelId) {
  const [unifiedData, setUnifiedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnifiedView = useCallback(async () => {
    if (!parcelId) {
      setUnifiedData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await parcelService.getUnifiedParcelView(parcelId);
      setUnifiedData(response.data);
    } catch (err) {
      setError(err.message || `Failed to load unified record for parcel ${parcelId}`);
    } finally {
      setLoading(false);
    }
  }, [parcelId]);

  useEffect(() => {
    fetchUnifiedView();
  }, [fetchUnifiedView]);

  return {
    unifiedData,
    loading,
    error,
    refetch: fetchUnifiedView,
  };
}
