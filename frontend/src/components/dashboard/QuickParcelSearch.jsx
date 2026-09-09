import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, ArrowRight, User, AlertTriangle, Layers } from 'lucide-react';
import { parcelService } from '../../services/parcelService.js';

export const QuickParcelSearch = ({ onSelectParcel, searchInputRef }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await parcelService.search(query);
        setResults(res.data || []);
        setIsOpen(true);
      } catch (err) {
        console.error('Quick search error', err);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (parcelId) => {
    setIsOpen(false);
    if (onSelectParcel) {
      onSelectParcel(parcelId);
    }
  };

  const handleQuickTagClick = (tag) => {
    setQuery(tag);
  };

  const quickTags = [
    { label: 'P001 (Ausa)', val: 'P001' },
    { label: 'Survey 124/2', val: '124/2' },
    { label: 'Kavtha', val: 'Kavtha' },
    { label: 'Disputed', val: 'Disputed' },
    { label: 'Rajesh Patil', val: 'Patil' },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Search Input Bar */}
      <div
        className="card"
        style={{
          padding: '0.85rem 1.25rem',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={20} style={{ color: 'var(--primary-400)', flexShrink: 0 }} />
          <input
            ref={searchInputRef}
            type="text"
            className="input-field"
            placeholder="Quick search parcel by Parcel ID, Survey No, Village, or Owner (e.g., P001, 124/2, Ausa)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (results.length > 0) setIsOpen(true);
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              fontSize: '0.95rem',
              color: 'var(--text-main)',
              outline: 'none',
            }}
          />
          {loading && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Searching...
            </span>
          )}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setIsOpen(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.2rem',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Try searches:</span>
          {quickTags.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => handleQuickTagClick(t.val)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.15rem 0.5rem',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-400)';
                e.currentTarget.style.color = 'var(--text-main)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Auto-complete Results Dropdown */}
      {isOpen && (
        <div
          className="card card-glass"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 100,
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '0.5rem',
            background: 'rgba(15, 23, 42, 0.98)',
            border: '1px solid var(--border-focus)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No parcels found matching "<strong style={{ color: 'var(--text-main)' }}>{query}</strong>".
              <div style={{ fontSize: '0.75rem', marginTop: '0.35rem', color: 'var(--text-dim)' }}>
                Try searching by Parcel ID (P001), Survey No (124/2), or Village Name.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                {results.length} Matching Cadastral Parcels
              </div>

              {results.map((parcel) => {
                const isDisputed = parcel.status === 'Disputed';
                const isPending = parcel.status === 'Pending Mutation';

                return (
                  <div
                    key={parcel.parcel_id}
                    onClick={() => handleSelect(parcel.parcel_id)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)',
                      background: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: 'var(--radius-sm)',
                          background: isDisputed
                            ? 'rgba(239, 68, 68, 0.15)'
                            : isPending
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(16, 185, 129, 0.15)',
                          color: isDisputed
                            ? '#ef4444'
                            : isPending
                            ? '#f59e0b'
                            : '#10b981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Layers size={18} />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            className="mono"
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              color: 'var(--primary-400)',
                            }}
                          >
                            {parcel.parcel_id}
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                            Survey No {parcel.survey_number}
                          </span>
                          {parcel.match_reason && (
                            <span
                              style={{
                                fontSize: '0.68rem',
                                padding: '0.1rem 0.4rem',
                                borderRadius: '4px',
                                background: 'rgba(56, 189, 248, 0.12)',
                                color: 'var(--accent-blue)',
                              }}
                            >
                              {parcel.match_reason}
                            </span>
                          )}
                        </div>

                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          {parcel.village}, Taluka {parcel.taluka} • {parcel.area} Ha ({parcel.land_use})
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        className={`status-pill ${
                          isDisputed
                            ? 'status-disputed'
                            : isPending
                            ? 'status-pending'
                            : 'status-active'
                        }`}
                        style={{ fontSize: '0.7rem', padding: '0.15rem 0.55rem' }}
                      >
                        <span className="status-dot" />
                        {parcel.status}
                      </span>
                      <ArrowRight size={14} style={{ color: 'var(--text-dim)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
