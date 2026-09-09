import React from 'react';
import { TransactionHistory } from '../records/TransactionHistory.jsx';

export const TransactionsSection = ({ transactions = [] }) => {
  return <TransactionHistory transactions={transactions} />;
};
