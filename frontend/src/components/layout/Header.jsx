import React, { useState } from 'react';
import {
  ShieldCheck,
  Bell,
  LogOut,
  User,
  ChevronDown,
  RefreshCw,
  Layers,
  Check,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { ENV } from '../../config/env.js';
import { ParcelSearch } from '../search/ParcelSearch.jsx';

export const Header = ({ activePageTitle, onToggleMobileMenu, onOpenRoleModal }) => {
  const { user, role, logout, switchRole, rolesMeta } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const currentRoleMeta = rolesMeta[role] || rolesMeta.Administrator;

  const handleSelectRole = (newRole) => {
    switchRole(newRole);
    setShowRoleDropdown(false);
  };

  return (
    <header className="app-header">
      {/* Left Title & Mobile Menu Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {onToggleMobileMenu && (
          <button
            className="btn btn-secondary btn-sm mobile-menu-btn"
            onClick={onToggleMobileMenu}
            style={{ padding: '0.4rem', display: 'none' }}
          >
            <Menu size={18} />
          </button>
        )}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {activePageTitle}
          </h2>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            {ENV.APP_NAME} • {user?.jurisdiction || 'Latur Cadastral Division'}
          </div>
        </div>
      </div>

      {/* Center/Right Global Parcel Search */}
      <div style={{ flex: 1, maxWidth: '320px', margin: '0 1rem' }}>
        <ParcelSearch
          placeholder="Search ID, Survey, Owner..."
          width="100%"
        />
      </div>

      {/* Right Controls: Role Switcher, Profile, Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Role Quick Switch Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderColor: 'var(--border-subtle)',
              background: '#ffffff',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: currentRoleMeta.badgeColor,
              }}
            />
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {role}
            </span>
            <ChevronDown size={14} style={{ color: 'var(--text-dim)' }} />
          </button>

          {showRoleDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                width: '240px',
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.5rem',
                zIndex: 100,
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                  padding: '0.4rem 0.6rem',
                }}
              >
                Switch User Persona (Demo)
              </div>

              {Object.values(rolesMeta).map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleSelectRole(r.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.5rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: role === r.name ? 'var(--bg-surface-hover)' : 'transparent',
                    color: role === r.name ? 'var(--primary-700)' : 'var(--text-main)',
                    fontSize: '0.8125rem',
                    fontWeight: role === r.name ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: r.badgeColor,
                      }}
                    />
                    <span>{r.name}</span>
                  </div>
                  {role === r.name && <Check size={14} />}
                </button>
              ))}

              {onOpenRoleModal && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setShowRoleDropdown(false);
                      onOpenRoleModal();
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-blue)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    View All Role Capabilities →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingLeft: '0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: currentRoleMeta.bgColor,
              color: currentRoleMeta.badgeColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
              {user?.full_name}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
              {user?.designation || user?.email}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={logout}
          title="Sign Out"
          style={{ padding: '0.45rem', color: 'var(--accent-rose)' }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};
