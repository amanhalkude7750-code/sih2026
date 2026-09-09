import React from 'react';
import { AuditTimeline } from './AuditTimeline.jsx';

export const AuditLogView = ({ auditEntries = [] }) => {
  return <AuditTimeline auditTrail={auditEntries} />;
};
