import React from 'react';

const statusClassMap = {
  Active: 'status-active',
  'Pending Mutation': 'status-pending',
  Disputed: 'status-disputed',
  Locked: 'status-locked',
  Archived: 'status-locked',
};

export const StatusPill = ({ status, className = '' }) => {
  const cls = statusClassMap[status] || 'status-active';

  return (
    <span className={`status-pill ${cls} ${className}`}>
      <span className="status-dot" />
      {status || 'Unknown'}
    </span>
  );
};
