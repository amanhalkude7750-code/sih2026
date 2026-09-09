import React from 'react';
import { Search, Database, Bell, ShieldCheck, Layers } from 'lucide-react';
import { ENV } from '../../config/env.js';

export const Navbar = ({ onSearch, activePageTitle = 'Dashboard' }) => {
  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{activePageTitle}</h2>
        <span className="badge badge-emerald">
          <ShieldCheck size={14} /> Maharashtra Land Portal
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Mock/API Mode Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.75rem',
          padding: '0.3rem 0.6rem',
          borderRadius: 'var(--radius-sm)',
          background: ENV.USE_MOCK_DATA ? 'rgba(56, 189, 248, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          color: ENV.USE_MOCK_DATA ? 'var(--accent-blue)' : 'var(--primary-400)',
          border: '1px solid currentColor'
        }}>
          <Database size={13} />
          <span>{ENV.USE_MOCK_DATA ? 'Local Mock DB Active' : 'REST Backend Connected'}</span>
        </div>

        {/* Global Search Bar */}
        <div className="input-group" style={{ width: '280px', height: '38px' }}>
          <Search size={16} style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search Parcel ID, Survey No..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>

        {/* Action Icon */}
        <button
          className="btn btn-secondary"
          style={{ padding: '0.5rem', width: '38px', height: '38px' }}
          title="Audit System Alerts"
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
};
