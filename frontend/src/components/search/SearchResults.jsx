import React from 'react';
import { ParcelResultItem } from './ParcelResultItem.jsx';
import { LoadingSpinner } from '../ui/LoadingSpinner.jsx';
import { Search, AlertCircle, Sparkles, X } from 'lucide-react';

export const SearchResults = ({
  results = [],
  loading = false,
  query = '',
  selectedParcelId,
  onSelectParcel,
  onSuggestionClick,
  onClose,
}) => {
  const suggestions = ['P001', '124/2', 'Ausa', 'Patil', 'P003', 'Shinde'];

  return (
    <div
      className="card card-glass search-results-container"
      style={{
        width: '100%',
        maxHeight: '420px',
        overflowY: 'auto',
        padding: '0.85rem',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
      }}
    >
      {/* Header with Result Count & Close */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          {loading
            ? 'Searching Cadastral Database...'
            : results.length > 0
            ? `Found ${results.length} Land Parcel${results.length > 1 ? 's' : ''}`
            : 'Search Results'}
        </span>

        {onClose && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClose}
            style={{ padding: '0.2rem', width: '22px', height: '22px' }}
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ padding: '1.5rem 0' }}>
          <LoadingSpinner message={`Searching records for "${query}"...`} />
        </div>
      )}

      {/* No Results Found */}
      {!loading && query && results.length === 0 && (
        <div style={{
          padding: '1.5rem 1rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          <AlertCircle size={24} style={{ color: 'var(--accent-amber)' }} />
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
            No parcels match "{query}"
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '320px', lineHeight: 1.4 }}>
            Try searching by Parcel ID (e.g. <code>P001</code>), Survey No (<code>124/2</code>),
            Village (<code>Ausa</code>), or Owner name (<code>Patil</code>).
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="badge badge-emerald"
                style={{ cursor: 'pointer', border: 'none' }}
                onClick={() => onSuggestionClick && onSuggestionClick(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State / Suggestions when query is empty */}
      {!loading && !query && (
        <div style={{ padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            <Sparkles size={14} style={{ color: 'var(--accent-blue)' }} />
            <span>Search by Parcel ID, Survey No, Village, or Owner:</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="badge badge-cyan"
                style={{ cursor: 'pointer', border: 'none', padding: '0.3rem 0.6rem' }}
                onClick={() => onSuggestionClick && onSuggestionClick(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results List */}
      {!loading && results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {results.map((parcel) => (
            <ParcelResultItem
              key={parcel.parcel_id}
              parcel={parcel}
              isSelected={parcel.parcel_id === selectedParcelId}
              onSelect={onSelectParcel}
            />
          ))}
        </div>
      )}
    </div>
  );
};
