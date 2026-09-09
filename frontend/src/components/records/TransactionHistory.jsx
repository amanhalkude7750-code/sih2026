import React from 'react';
import { ArrowRightLeft, Calendar, FileText } from 'lucide-react';
import { formatCurrencyINR, formatDate } from '../../utils/formatters.js';

export const TransactionHistory = ({ transactions = [] }) => {
  if (!transactions.length) {
    return <div style={{ color: 'var(--text-dim)', padding: '1rem' }}>No transaction history found for this parcel.</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Type & SRO Registry No</th>
            <th>From (Transferor)</th>
            <th>To (Transferee)</th>
            <th>Date</th>
            <th>Consideration Value</th>
            <th>Stamp Duty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.transaction_id}>
              <td>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  {txn.transaction_type}
                </div>
                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>
                  {txn.registration_number}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                  {txn.sub_registrar_office}
                </div>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>{txn.from_party}</td>
              <td style={{ color: 'var(--primary-400)', fontWeight: 500 }}>{txn.to_party}</td>
              <td>{formatDate(txn.transaction_date)}</td>
              <td style={{ fontWeight: 700 }}>
                {txn.consideration_amount_inr ? formatCurrencyINR(txn.consideration_amount_inr) : 'Nominal / Nil'}
              </td>
              <td>{formatCurrencyINR(txn.stamp_duty_paid_inr)}</td>
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
