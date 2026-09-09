import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Calendar,
  User,
  Landmark,
  LayoutGrid,
  List,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrencyINR, formatDate } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export const TransactionHistory = ({ transactions = [] }) => {
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'card'
  const [searchTerm, setSearchTerm] = useState('');

  if (!transactions.length) {
    return (
      <EmptyState
        title="No Transactions Recorded"
        description="No historical conveyance deeds, inheritance transfers, or mortgage liens have been registered for this parcel in the Sub-Registrar Office database."
      />
    );
  }

  const filtered = transactions.filter((txn) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      txn.transaction_type.toLowerCase().includes(term) ||
      txn.registration_number.toLowerCase().includes(term) ||
      txn.from_party.toLowerCase().includes(term) ||
      txn.to_party.toLowerCase().includes(term) ||
      txn.sub_registrar_office.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Search & Layout View Mode Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div className="input-group" style={{ maxWidth: '320px', width: '100%' }}>
          <Search size={15} style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Filter transactions by party, SRO..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <List size={15} /> Table
          </button>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'card' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('card')}
            title="Card View"
          >
            <LayoutGrid size={15} /> Cards
          </button>
        </div>
      </div>

      {/* Table Mode */}
      {viewMode === 'table' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>SRO Registry Number</th>
                <th>Transferor (Previous Party)</th>
                <th>Transferee (New Party)</th>
                <th>Registration Date</th>
                <th>Consideration Value</th>
                <th>Stamp Duty Paid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn) => (
                <tr key={txn.transaction_id}>
                  <td>
                    <span className="badge badge-cyan">{txn.transaction_type}</span>
                  </td>
                  <td className="mono" style={{ fontWeight: 600, color: 'var(--primary-700)' }}>
                    {txn.registration_number}
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {txn.sub_registrar_office}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                      <User size={13} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                      <span>{txn.from_party}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                      <User size={13} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
                      <span>{txn.to_party}</span>
                    </div>
                  </td>
                  <td>{formatDate(txn.transaction_date)}</td>
                  <td style={{ fontWeight: 700 }}>
                    {txn.consideration_amount_inr ? formatCurrencyINR(txn.consideration_amount_inr) : 'Ancestral / Nil'}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {formatCurrencyINR(txn.stamp_duty_paid_inr)}
                  </td>
                  <td>
                    <span className="badge badge-emerald">{txn.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card Mode */}
      {viewMode === 'card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((txn) => (
            <div
              key={txn.transaction_id}
              className="card"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowRightLeft size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                      {txn.transaction_type}
                    </div>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--primary-700)' }}>
                      Registry #{txn.registration_number} • {txn.sub_registrar_office}
                    </div>
                  </div>
                </div>

                <span className="badge badge-emerald">{txn.status}</span>
              </div>

              {/* Transfer Flow Visualizer */}
              <div
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  fontSize: '0.8125rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Transferor (Previous Party)
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>
                    {txn.from_party}
                  </div>
                </div>

                <div style={{ color: 'var(--primary-600)', fontWeight: 700 }}>
                  ➔ ➔
                </div>

                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Transferee (New Party)
                  </div>
                  <div style={{ color: 'var(--primary-700)', fontWeight: 700, marginTop: '2px' }}>
                    {txn.to_party}
                  </div>
                </div>
              </div>

              {/* Financial & Date Metadata */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div>Date: <strong>{formatDate(txn.transaction_date)}</strong></div>
                <div>Consideration Value: <strong style={{ color: 'var(--text-main)' }}>{txn.consideration_amount_inr ? formatCurrencyINR(txn.consideration_amount_inr) : 'Ancestral / Nil'}</strong></div>
                <div>Stamp Duty Paid: <strong>{formatCurrencyINR(txn.stamp_duty_paid_inr)}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
