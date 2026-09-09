import React, { useState, useEffect } from 'react';
import { useParcelSelection } from '../hooks/useParcelSelection.js';
import { ParcelInformationPanel } from '../components/parcel/ParcelInformationPanel.jsx';
import { ParcelSearch } from '../components/search/ParcelSearch.jsx';
import { parcelService } from '../services/parcelService.js';

export const UnifiedViewPage = () => {
  const { selectedParcelId, selectParcel } = useParcelSelection();
  const [parcelList, setParcelList] = useState([]);
  const currentId = selectedParcelId || 'P001';

  useEffect(() => {
    async function loadParcels() {
      try {
        const res = await parcelService.getParcels();
        setParcelList(res.data || []);
      } catch (err) {
        console.error('Failed to load parcel list for selector', err);
      }
    }
    loadParcels();
  }, []);

  const handleIdChange = (id) => {
    selectParcel(id, { openInspector: true, zoomMap: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Selector Toolbar */}
      <div
        className="card card-glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.125rem' }}>Unified Cadastral Land Dossier</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            One Parcel → One Unified View → Faster Land Governance Decisions
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ width: '280px' }}>
            <ParcelSearch placeholder="Find any parcel..." width="100%" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Select:</span>
            <select
              className="select-field"
              value={currentId}
              onChange={(e) => handleIdChange(e.target.value)}
              style={{ fontWeight: 700, color: 'var(--primary-400)' }}
            >
              {parcelList.map((p) => (
                <option key={p.parcel_id} value={p.parcel_id}>
                  {p.parcel_id} — Survey {p.survey_number} ({p.village})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Modular Unified Parcel Information Panel */}
      <ParcelInformationPanel parcelId={currentId} />
    </div>
  );
};
