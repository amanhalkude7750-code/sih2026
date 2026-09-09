import React from 'react';
import { UserCheck, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';

export const OwnershipTable = ({ owners = [] }) => {
  if (!owners.length) {
    return <div style={{ color: 'var(--text-dim)', padding: '1rem' }}>No ownership records linked.</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Owner Name & Relation</th>
            <th>Ownership Type</th>
            <th>Share %</th>
            <th>Aadhaar Hash</th>
            <th>Acquisition Date</th>
            <th>Contact & Address</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.owner_id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: owner.is_primary ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: owner.is_primary ? 'var(--primary-400)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <UserCheck size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      {owner.full_name} {owner.is_primary && <span className="badge badge-emerald" style={{ marginLeft: '4px' }}>Primary</span>}
                    </div>
                    {owner.guardian_name && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        Guardian: {owner.guardian_name}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-cyan">{owner.ownership_type}</span>
              </td>
              <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>
                {owner.share_percentage}%
              </td>
              <td>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {owner.aadhaar_hash || '-'}
                </span>
              </td>
              <td>{formatDate(owner.acquired_date)}</td>
              <td>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {owner.contact_phone && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={12} /> {owner.contact_phone}
                    </span>
                  )}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {owner.address}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
