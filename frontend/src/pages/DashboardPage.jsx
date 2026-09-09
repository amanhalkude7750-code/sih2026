import React from 'react';
import { GovernanceOverview } from '../components/dashboard/GovernanceOverview.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { ShieldCheck, FileCheck, MapPin, User, Sparkles } from 'lucide-react';

export const DashboardPage = ({ onNavigateToParcel, onNavigateToTab }) => {
  const { user, role, rolesMeta } = useAuth();
  const currentRoleMeta = rolesMeta[role] || rolesMeta.Administrator;

  const roleRoleTips = {
    Administrator: 'System Health: 100% Cadastral nodes synchronized. PostGIS GIS vector pipelines ready.',
    'Revenue Officer': 'Pending Actions: 2 Ferfar mutation notices awaiting digital signature verification in Ausa Circle.',
    'Survey Officer': 'Demarcation Queue: 1 boundary conflict flagged in Survey No 205/4 for ETS re-survey.',
    Citizen: 'Citizen Account: Rameshwar B. Deshmukh — 1 Agricultural Parcel registered with clear title.',
  };

  return (
    <PageContainer
      title={`Land Governance Dashboard`}
      subtitle={`Welcome back, ${user?.full_name} (${role})`}
      badge={
        <span
          className="badge"
          style={{
            background: currentRoleMeta.bgColor,
            color: currentRoleMeta.badgeColor,
            border: `1px solid ${currentRoleMeta.badgeColor}40`,
          }}
        >
          {currentRoleMeta.label}
        </span>
      }
    >
      {/* Role Authority Advisory Notice */}
      <div
        className="card"
        style={{
          background: '#ffffff',
          borderLeft: `4px solid ${currentRoleMeta.badgeColor}`,
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={18} style={{ color: currentRoleMeta.badgeColor, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Active Authority Context: {user?.designation} ({user?.jurisdiction})
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {roleRoleTips[role]}
            </div>
          </div>
        </div>

        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          Session: Active
        </span>
      </div>

      {/* Main Governance Overview Engine */}
      <GovernanceOverview
        onNavigateToParcel={onNavigateToParcel}
        onOpenFullGIS={() => onNavigateToTab && onNavigateToTab('gis-map')}
      />
    </PageContainer>
  );
};
