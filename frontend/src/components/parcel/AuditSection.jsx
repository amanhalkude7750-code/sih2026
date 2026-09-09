import React from 'react';
import { AuditTimeline } from '../records/AuditTimeline.jsx';

export const AuditSection = ({ auditTrail = [] }) => {
  return <AuditTimeline auditTrail={auditTrail} />;
};
