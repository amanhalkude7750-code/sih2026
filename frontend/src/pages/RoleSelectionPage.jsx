import React from 'react';
import { Landmark, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { RoleSelector } from '../components/layout/RoleSelector.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { ENV } from '../config/env.js';

export const RoleSelectionPage = ({ onProceedToDashboard }) => {
  const { role, switchRole, user } = useAuth();

  const handleSelectRole = (newRole) => {
    switchRole(newRole);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'radial-gradient(ellipse at top center, rgba(45, 90, 56, 0.08) 0%, #f5f8f5 75%)',
      color: 'var(--text-main)',
      padding: '2.5rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}>
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <Landmark size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-700)', letterSpacing: '0.04em' }}>LANDSTACK</h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Step 2 of 2: Confirm Administrative Persona
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onProceedToDashboard}
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.925rem' }}
          >
            <span>Launch Dashboard as {role}</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Intro */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Select Active Governance Persona
          </h1>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Each persona simulates distinct administrative authorities within the Land Governance DPI ecosystem.
            Select an authority below to view tailored actions, metrics, and workflows.
          </p>
        </div>

        {/* Roles Grid */}
        <RoleSelector selectedRole={role} onSelectRole={handleSelectRole} />

        {/* Bottom CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1rem',
        }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onProceedToDashboard}
            style={{ padding: '0.85rem 2.25rem', fontSize: '1rem', fontWeight: 700 }}
          >
            <span>Confirm & Enter Dashboard</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
