import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { parcelService } from '../services/parcelService.js';

const ParcelContext = createContext(null);

export const ParcelProvider = ({ children, initialParcelId = 'P001' }) => {
  const [selectedParcelId, setSelectedParcelId] = useState(initialParcelId);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [zoomRequest, setZoomRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  // Synchronize parcel details whenever selectedParcelId changes
  useEffect(() => {
    let isCurrent = true;

    async function loadParcelDetails() {
      if (!selectedParcelId) {
        setSelectedParcel(null);
        return;
      }
      setLoading(true);
      try {
        const res = await parcelService.getParcelById(selectedParcelId);
        if (isCurrent) {
          setSelectedParcel(res.data);
        }
      } catch (err) {
        console.warn(`Failed to fetch parcel ${selectedParcelId}:`, err);
        if (isCurrent) {
          setSelectedParcel(null);
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }

    loadParcelDetails();

    return () => {
      isCurrent = false;
    };
  }, [selectedParcelId]);

  /**
   * Primary method to select a parcel across search, map, or explorer
   */
  const selectParcel = useCallback((parcelId, options = { openInspector: true, zoomMap: true }) => {
    if (!parcelId) return;
    const normalizedId = parcelId.toUpperCase().trim();
    setSelectedParcelId(normalizedId);

    if (options.openInspector !== false) {
      setIsInspectorOpen(true);
    }

    if (options.zoomMap !== false) {
      // Trigger a map zoom event with timestamp to distinguish repeat clicks
      setZoomRequest({ parcelId: normalizedId, timestamp: Date.now() });
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedParcelId(null);
    setSelectedParcel(null);
    setIsInspectorOpen(false);
    setZoomRequest(null);
  }, []);

  const value = {
    selectedParcelId,
    selectedParcel,
    isInspectorOpen,
    setIsInspectorOpen,
    zoomRequest,
    loading,
    selectParcel,
    clearSelection,
  };

  return (
    <ParcelContext.Provider value={value}>
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcelSelection = () => {
  const context = useContext(ParcelContext);
  if (!context) {
    throw new Error('useParcelSelection must be used within a ParcelProvider');
  }
  return context;
};
