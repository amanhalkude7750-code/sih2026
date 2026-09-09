import React from 'react';
import { ArrowRightLeft, Calendar, FileText, Landmark, User } from 'lucide-react';
import { formatCurrencyINR, formatDate } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

export const TransactionsSection = ({ transactions = [] }) => {
  if (!transactions.length) {
    return (
      <EmptyState
        title="No Transfer Transactions Recorded"
        description="No historical sale deeds, inheritance partitions, or mortgages have been registered for this parcel in the SRO database."
      />
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Type & SRO Registry</th>
            <th>Transferor (From)</th>
            <th>Transferee (To)</th>
            <th>Registration Date</th>
            <th>Consideration Value</th>
            <th>Stamp Duty Paid</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.transaction_id}>
              <td>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                  {txn.transaction_type}
                </div>
                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', marginTop: '2px' }}>
                  {txn.registration_number}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                  {txn.sub_registrar_office}
                </div>
              </td>

              <td style={{ color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <User size={13} style={{ color: 'var(--text-dim)' }} />
                  <span>{txn.from_party}</span>
                </div>
              </td>

              <td style={{ color: 'var(--primary-400)', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <User size={13} style={{ color: 'var(--primary-400)' }} />
                  <span>{txn.to_party}</span>
                </div>
              </td>

              <td>{formatDate(txn.transaction_date)}</td>

              <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>
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
  );
};
