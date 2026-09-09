import React from 'react';
import { GovernanceOverview } from '../components/dashboard/GovernanceOverview.jsx';

export const DashboardPage = ({ onNavigateToParcel }) => {
  return (
    <div>
      <GovernanceOverview onNavigateToParcel={onNavigateToParcel} />
    </div>
  );
};
