import React, { useState } from 'react';
import { Search, Filter, RotateCcw, LayoutGrid, List } from 'lucide-react';
import { useParcels } from '../hooks/useParcels.js';
import { useParcelSelection } from '../hooks/useParcelSelection.js';
import { ParcelSearch } from '../components/search/ParcelSearch.jsx';
import { ParcelCard } from '../components/parcel/ParcelCard.jsx';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { TALUKAS_LATUR } from '../utils/constants.js';

export const ParcelExplorerPage = ({ onSelectParcel }) => {
  const { parcels, loading, error, filters, updateFilter, resetFilters } = useParcels();
  const { selectedParcelId, selectParcel } = useParcelSelection();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const handleSelect = (parcelId) => {
    selectParcel(parcelId, { openInspector: true, zoomMap: true });
    if (onSelectParcel) onSelectParcel(parcelId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Search & Filter Header Bar */}
      <div className="card card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Cadastral Parcel Explorer</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Filter and search across registered land parcels in Latur District
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={16} /> Grid
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List size={16} /> Table
            </button>
          </div>
        </div>

        {/* Filters Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          {/* Search */}
          <div className="input-group">
            <Search size={16} style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search ID, Survey, Village..."
              value={filters.search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>

          {/* Taluka Filter */}
          <select
            className="select-field"
            value={filters.taluka || 'All'}
            onChange={(e) => updateFilter('taluka', e.target.value)}
          >
            <option value="All">Taluka: All</option>
            {TALUKAS_LATUR.filter((t) => t !== 'All').map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="select-field"
            value={filters.status || 'All'}
            onChange={(e) => updateFilter('status', e.target.value)}
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Pending Mutation">Pending Mutation</option>
            <option value="Disputed">Disputed</option>
            <option value="Locked">Locked</option>
          </select>

          {/* Land Use Filter */}
          <select
            className="select-field"
            value={filters.land_use || 'All'}
            onChange={(e) => updateFilter('land_use', e.target.value)}
          >
            <option value="All">Land Use: All</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Forest / Eco-Sensitive">Forest / Eco-Sensitive</option>
          </select>

          {/* Reset Filters */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={resetFilters}
            style={{ height: '38px' }}
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <LoadingSpinner message="Querying cadastral database..." />
      ) : error ? (
        <div className="card" style={{ color: 'var(--accent-rose)', border: '1px solid rgba(239,68,68,0.3)' }}>
          {error}
        </div>
      ) : parcels.length === 0 ? (
        <EmptyState
          title="No Matching Land Parcels"
          description="No parcel records matched the specified filter criteria. Try resetting filters."
          action={
            <button className="btn btn-secondary btn-sm" onClick={resetFilters}>
              Clear Filters
            </button>
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid-cols-3">
          {parcels.map((parcel) => (
            <ParcelCard
              key={parcel.parcel_id}
              parcel={parcel}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Parcel ID</th>
                <th>Survey #</th>
                <th>Village</th>
                <th>Taluka</th>
                <th>Land Use</th>
                <th>Area</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p) => (
                <tr key={p.parcel_id}>
                  <td className="mono" style={{ fontWeight: 700, color: 'var(--primary-400)' }}>
                    {p.parcel_id}
                  </td>
                  <td style={{ fontWeight: 600 }}>{p.survey_number}</td>
                  <td>{p.village}</td>
                  <td>{p.taluka}</td>
                  <td>{p.land_use}</td>
                  <td>{p.area} {p.area_unit}</td>
                  <td>
                    <span className="badge badge-cyan">{p.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleSelect(p.parcel_id)}
                    >
                      Unified View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
