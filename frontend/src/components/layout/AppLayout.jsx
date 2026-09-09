import React, { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Header } from './Header.jsx';
import { RoleSelector } from './RoleSelector.jsx';
import { X, RefreshCw } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';

export const AppLayout = ({ activeTab, onSelectTab, children }) => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { role, switchRole } = useAuth();

  const pageTitles = {
    dashboard: 'Governance Overview & KPIs',
    explorer: 'Cadastral Parcel Explorer',
    unified: 'One Parcel → One Unified View',
    'gis-map': 'Cadastral GIS Spatial Engine',
    audit: 'Tamper-Evident Audit Trail',
  };

  const handleRoleSelect = (newRole) => {
    switchRole(newRole);
    setShowRoleModal(false);
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          onSelectTab(tab);
          setMobileMenuOpen(false);
        }}
        onOpenRoleModal={() => setShowRoleModal(true)}
      />

      {/* Main Container */}
      <div className="app-main">
        <Header
          activePageTitle={pageTitles[activeTab] || 'Land Governance DPI'}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenRoleModal={() => setShowRoleModal(true)}
        />
        <main className="app-content">{children}</main>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '1.5rem',
          }}
          onClick={() => setShowRoleModal(false)}
        >
          <div
            className="card card-glass"
            style={{
              maxWidth: '960px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                  Switch Administrative Persona
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Select an authority role to simulate land governance workflows for SIH 2026 judging
                </p>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowRoleModal(false)}
                style={{ padding: '0.4rem' }}
              >
                <X size={18} />
              </button>
            </div>

            <RoleSelector selectedRole={role} onSelectRole={handleRoleSelect} />
          </div>
        </div>
      )}
    </div>
  );
};
