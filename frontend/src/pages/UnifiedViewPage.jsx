import { useParcelSelection } from '../hooks/useParcelSelection.js';
import { UnifiedRecordView } from '../components/records/UnifiedRecordView.jsx';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { Search, ChevronDown } from 'lucide-react';
import { mockParcels } from '../data/mock/parcels.js';

export const UnifiedViewPage = () => {
  const { selectedParcelId, selectParcel } = useParcelSelection();
  const currentId = selectedParcelId || 'P001';
  const { unifiedData, loading, error } = useParcelDetail(currentId);

  const handleIdChange = (id) => {
    selectParcel(id, { openInspector: true, zoomMap: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Selector Toolbar */}
      <div className="card card-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem' }}>One Parcel → One Unified View Dossier</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Select any registered parcel to inspect unified title, extracts, disputes, and audit trail
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Active Parcel:</span>
          <select
            className="select-field"
            value={currentId}
            onChange={(e) => handleIdChange(e.target.value)}
            style={{ fontWeight: 700, color: 'var(--primary-400)' }}
          >
            {mockParcels.map((p) => (
              <option key={p.parcel_id} value={p.parcel_id}>
                {p.parcel_id} — Survey {p.survey_number} ({p.village}, {p.taluka})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Unified View Component */}
      {loading ? (
        <LoadingSpinner message={`Aggregating unified dossier for ${currentId}...`} />
      ) : error ? (
        <EmptyState
          title="Parcel Not Found"
          description={error}
          action={
            <button className="btn btn-secondary btn-sm" onClick={() => handleIdChange('P001')}>
              Load Sample Parcel P001
            </button>
          }
        />
      ) : (
        <UnifiedRecordView unifiedData={unifiedData} />
      )}
    </div>
  );
};
