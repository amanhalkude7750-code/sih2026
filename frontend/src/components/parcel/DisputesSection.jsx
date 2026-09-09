import React from 'react';
import { DisputeAlerts } from '../records/DisputeAlerts.jsx';

export const DisputesSection = ({ disputes = [] }) => {
  return <DisputeAlerts disputes={disputes} />;
};
