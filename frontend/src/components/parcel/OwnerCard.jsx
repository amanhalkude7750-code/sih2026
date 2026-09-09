import React from 'react';
import { UserCheck, Shield, Phone, Mail, MapPin, Calendar, Percent } from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export const OwnerCard = ({ owners = [] }) => {
  if (!owners.length) {
    return (
      <EmptyState
        title="No Ownership Records Linked"
        description="This parcel has no registered private title holders. It may be government land or pending succession mutation."
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {owners.map((owner) => (
        <div
          key={owner.owner_id}
          className="card"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: owner.is_primary
              ? '1px solid rgba(16, 185, 129, 0.4)'
              : '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: owner.is_primary ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: owner.is_primary ? 'var(--primary-400)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {owner.full_name?.charAt(0) || 'O'}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {owner.full_name}
                  </h4>
                  {owner.is_primary && (
                    <span className="badge badge-emerald">Primary Title Holder</span>
                  )}
                  <span className="badge badge-cyan">{owner.ownership_type}</span>
                </div>
                {owner.guardian_name && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    Care of / Guardian: <strong>{owner.guardian_name}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Share Percentage Box */}
            <div
              style={{
                textAlign: 'right',
                background: 'rgba(11, 15, 25, 0.5)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Undivided Share
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-400)' }}>
                {owner.share_percentage}%
              </div>
            </div>
          </div>

          {/* Share Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${owner.share_percentage}%`,
                height: '100%',
                background: owner.is_primary
                  ? 'linear-gradient(90deg, var(--primary-500), var(--primary-400))'
                  : 'linear-gradient(90deg, var(--accent-blue), #38bdf8)',
                borderRadius: '3px',
              }}
            />
          </div>

          {/* Identification & Contact Details Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '0.75rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Aadhaar Hash: </span>
              <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                {owner.aadhaar_hash || 'Not Linked'}
              </span>
            </div>

            <div>
              <span style={{ color: 'var(--text-dim)' }}>Acquisition Date: </span>
              <span style={{ color: 'var(--text-main)' }}>
                {formatDate(owner.acquired_date)}
              </span>
            </div>

            {owner.contact_phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Phone size={13} style={{ color: 'var(--accent-blue)' }} />
                <span>{owner.contact_phone}</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', gridColumn: 'span 2' }}>
              <MapPin size={13} style={{ color: 'var(--primary-400)', flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {owner.address}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
