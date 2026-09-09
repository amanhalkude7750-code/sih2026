import React from 'react';
import { Shield, FileCheck, MapPin, User, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';

const roleIcons = {
  Administrator: Shield,
  'Revenue Officer': FileCheck,
  'Survey Officer': MapPin,
  Citizen: User,
};

export const RoleSelector = ({ selectedRole, onSelectRole, showAsCards = true }) => {
  const { rolesMeta } = useAuth();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.25rem',
      width: '100%',
    }}>
      {Object.values(rolesMeta).map((r) => {
        const Icon = roleIcons[r.name] || Shield;
        const isSelected = selectedRole === r.name;

        return (
          <div
            key={r.id}
            onClick={() => onSelectRole && onSelectRole(r.name)}
            className="card card-hover"
            style={{
              cursor: 'pointer',
              border: isSelected
                ? `2px solid ${r.badgeColor}`
                : '1px solid var(--border-subtle)',
              background: isSelected
                ? 'rgba(30, 41, 59, 0.95)'
                : 'var(--bg-surface)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: isSelected ? `0 0 20px ${r.bgColor}` : 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div>
              {/* Card Header with Icon & Role Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  background: r.bgColor,
                  color: r.badgeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={24} />
                </div>

                {isSelected ? (
                  <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={14} /> Active Persona
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: r.badgeColor,
                      background: r.bgColor,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {r.label}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                {r.name}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                {r.description}
              </p>

              {/* Capabilities Checklist */}
              <div style={{
                background: 'rgba(11, 15, 25, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                marginBottom: '1rem',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                  Assigned Authority
                </div>
                {r.capabilities.slice(0, 3).map((cap, idx) => (
                  <div key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: r.badgeColor }}>•</span>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Persona Action */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '0.75rem',
              marginTop: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {r.defaultUser.full_name}
              </div>
              <button
                type="button"
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  background: isSelected ? r.badgeColor : undefined,
                  borderColor: isSelected ? r.badgeColor : undefined,
                }}
              >
                <span>{isSelected ? 'Selected' : 'Select Role'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
