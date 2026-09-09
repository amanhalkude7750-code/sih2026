import React, { useState } from 'react';
import { Layers, ArrowRight, Eye, Filter, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters.js';

export const RecentParcelsTable = ({ parcels = [], onNavigateToParcel, onHighlightOnMap }) => {
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = parcels.filter((p) => {
    if (filterStatus === 'All') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
      {/* Table Header Bar with Status Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Cadastral Land Parcels & Survey Records
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Synchronized with Maharashtra Bhumi Abhilekh & SRO registration registers
          </p>
        </div>

        {/* Status Filter Chips */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {['All', 'Active', 'Pending Mutation', 'Disputed'].map((status) => {
            const isActive = filterStatus === status;
            return (
              <button
                key={status}
                type="button"
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus(status)}
                style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Data Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Survey / Sub-div</th>
              <th>Village & Taluka</th>
              <th>Land Use</th>
              <th>Area</th>
              <th>Valuation</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const isDisputed = p.status === 'Disputed';
              const isPending = p.status === 'Pending Mutation';

              return (
                <tr
                  key={p.parcel_id}
                  style={{
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                  }}
                  onClick={() => onNavigateToParcel && onNavigateToParcel(p.parcel_id)}
                >
                  <td className="mono" style={{ fontWeight: 700, color: 'var(--primary-400)' }}>
                    {p.parcel_id}
                  </td>
                  <td>
                    <strong style={{ color: 'var(--text-main)' }}>{p.survey_number}</strong>
                    {p.sub_division && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        /{p.sub_division}
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-main)' }}>{p.village}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: '0.35rem' }}>
                      ({p.taluka})
                    </span>
                  </td>
                  <td>{p.land_use}</td>
                  <td className="mono">{p.area} {p.area_unit || 'Ha'}</td>
                  <td className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {p.market_valuation_inr ? formatCurrencyINR(p.market_valuation_inr) : '—'}
                  </td>
                  <td>
                    <span
                      className={`status-pill ${
                        isDisputed
                          ? 'status-disputed'
                          : isPending
                          ? 'status-pending'
                          : 'status-active'
                      }`}
                    >
                      <span className="status-dot" />
                      {p.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onNavigateToParcel) onNavigateToParcel(p.parcel_id);
                        }}
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
                      >
                        <Eye size={12} />
                        <span>Unified View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
