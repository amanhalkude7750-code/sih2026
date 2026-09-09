import React from 'react';
import {
  LayoutDashboard,
  Layers,
  MapPin,
  FileText,
  History,
  ShieldAlert,
  Settings,
  Landmark,
} from 'lucide-react';
import { ENV } from '../../config/env.js';

export const Sidebar = ({ activeTab, onSelectTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Governance Overview', icon: LayoutDashboard },
    { id: 'explorer', label: 'Parcel Explorer', icon: Layers },
    { id: 'unified', label: 'Unified Parcel View', icon: Landmark },
    { id: 'gis-map', label: 'GIS Cadastral Map', icon: MapPin, badge: 'Module 2' },
    { id: 'audit', label: 'Tamper Audit Trail', icon: History },
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, var(--primary-500), #047857)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 0 12px var(--primary-glow)'
        }}>
          <Landmark size={20} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            {ENV.APP_NAME}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            SIH 2026 DPI Edition
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ padding: '1rem 0.75rem', flex: 1 }}>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          letterSpacing: '0.08em',
          padding: '0.5rem 0.75rem 0.75rem',
        }}>
          Core Modules
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  color: isActive ? 'var(--primary-400)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} style={{ color: isActive ? 'var(--primary-400)' : 'var(--text-dim)' }} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.4rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: 'var(--accent-blue)',
                    fontWeight: 600,
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Info */}
      <div style={{
        padding: '1rem 1.25rem',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(11, 15, 25, 0.5)',
      }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
          <strong>One Parcel → One View</strong><br />
          Latur Pilot District (Cadastral GIS)
        </div>
      </div>
    </aside>
  );
};
