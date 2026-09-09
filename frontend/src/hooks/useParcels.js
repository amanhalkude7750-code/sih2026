import { useState, useEffect, useCallback } from 'react';
import { parcelService } from '../services/parcelService.js';

export function useParcels(initialFilters = {}) {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchParcels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await parcelService.getParcels(filters);
      setParcels(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch parcels');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchParcels();
  }, [fetchParcels]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    parcels,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    refetch: fetchParcels,
  };
}
