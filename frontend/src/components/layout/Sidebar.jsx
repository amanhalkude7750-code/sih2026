import React from 'react';
import {
  LayoutDashboard,
  Layers,
  MapPin,
  FileText,
  History,
  ShieldAlert,
  Landmark,
  UserCheck,
  RefreshCw,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { NavigationItem } from './NavigationItem.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { ENV } from '../../config/env.js';

export const Sidebar = ({ activeTab, onSelectTab, onOpenRoleModal }) => {
  const { user, role, rolesMeta, logout } = useAuth();
  const currentRoleMeta = rolesMeta[role] || rolesMeta.Administrator;

  const navItems = [
    { id: 'dashboard', label: 'Governance Dashboard', icon: LayoutDashboard },
    { id: 'explorer', label: 'Cadastral Explorer', icon: Layers },
    { id: 'unified', label: 'Unified Parcel Dossier', icon: Landmark },
    { id: 'gis-map', label: 'GIS Cadastral Map', icon: MapPin, badge: 'Live GIS' },
    { id: 'audit', label: 'Tamper Audit Trail', icon: History },
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand & DPI Header */}
      <div
        style={{
          padding: '1.25rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(35, 83, 50, 0.2)',
            flexShrink: 0,
          }}
        >
          <Layers size={20} />
        </div>
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.04em',
              color: 'var(--primary-700)',
              lineHeight: 1.1,
            }}
          >
            LANDSTACK
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
            Center for Land Governance
          </div>
        </div>
      </div>

      {/* Active Persona Banner */}
      <div
        style={{
          margin: '1rem 0.85rem 0.5rem',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface-hover)',
          border: `1px solid var(--border-subtle)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700 }}>
            Active Persona
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              color: currentRoleMeta.badgeColor,
              fontWeight: 700,
              background: currentRoleMeta.bgColor,
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {role}
          </span>
        </div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>
          {user?.full_name}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          {user?.designation}
        </div>

        {onOpenRoleModal && (
          <button
            onClick={onOpenRoleModal}
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.35rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              background: '#ffffff',
              color: 'var(--primary-700)',
              fontSize: '0.7rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={11} /> Switch Persona
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <div style={{ padding: '0.75rem 0.75rem', flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
            letterSpacing: '0.08em',
            padding: '0.5rem 0.75rem 0.6rem',
          }}
        >
          Navigation
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => (
            <NavigationItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              badge={item.badge}
              isActive={activeTab === item.id}
              onClick={() => onSelectTab(item.id)}
            />
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <div>One Parcel → One View</div>
          <div style={{ color: 'var(--primary-600)', fontWeight: 600 }}>landstack.org DPI</div>
        </div>
        <button
          onClick={logout}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.35rem', color: 'var(--accent-terracotta)' }}
          title="Logout"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
};
