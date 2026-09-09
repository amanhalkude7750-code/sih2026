import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2, Compass } from 'lucide-react';
import { parcelService } from '../../services/parcelService.js';
import { useParcelSelection } from '../../hooks/useParcelSelection.js';
import { SearchResults } from './SearchResults.jsx';

export const ParcelSearch = ({
  placeholder = 'Search Parcel ID, Survey #, Village, Owner...',
  width = '100%',
  onSelectCallback,
  showDropdown = true,
  autoFocus = false,
}) => {
  const { selectedParcelId, selectParcel } = useParcelSelection();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Debounced search logic using parcelService abstraction
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await parcelService.search(searchTerm);
        setResults(res.data || []);
      } catch (err) {
        console.error('Parcel search failed:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelect = (parcelId, parcel) => {
    selectParcel(parcelId, { openInspector: true, zoomMap: true });
    setIsDropdownOpen(false);
    if (onSelectCallback) onSelectCallback(parcelId, parcel);
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    setIsDropdownOpen(false);
  };

  const handleSuggestionClick = (term) => {
    setSearchTerm(term);
    setIsDropdownOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className="parcel-search-wrapper"
      style={{ position: 'relative', width }}
    >
      {/* Search Input Bar */}
      <div
        className="input-group"
        style={{
          width: '100%',
          background: 'rgba(15, 23, 42, 0.95)',
          border: isDropdownOpen
            ? '1px solid var(--primary-500)'
            : '1px solid var(--border-subtle)',
          boxShadow: isDropdownOpen ? '0 0 12px var(--primary-glow)' : 'var(--shadow-sm)',
        }}
      >
        <Search
          size={16}
          style={{ color: isDropdownOpen ? 'var(--primary-400)' : 'var(--text-dim)', flexShrink: 0 }}
        />

        <input
          type="text"
          className="input-field"
          placeholder={placeholder}
          value={searchTerm}
          autoFocus={autoFocus}
          onFocus={() => setIsDropdownOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          style={{ width: '100%' }}
        />

        {/* Loading Spinner or Clear Button */}
        {loading ? (
          <Loader2
            size={16}
            style={{ color: 'var(--primary-400)', animation: 'spin 1s linear infinite', flexShrink: 0 }}
          />
        ) : searchTerm ? (
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              padding: 0,
            }}
            title="Clear search"
          >
            <X size={15} />
          </button>
        ) : null}
      </div>

      {/* Popover Dropdown Results */}
      {showDropdown && isDropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            width: '100%',
            minWidth: '340px',
            zIndex: 1100,
          }}
        >
          <SearchResults
            results={results}
            loading={loading}
            query={searchTerm}
            selectedParcelId={selectedParcelId}
            onSelectParcel={handleSelect}
            onSuggestionClick={handleSuggestionClick}
            onClose={() => setIsDropdownOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
