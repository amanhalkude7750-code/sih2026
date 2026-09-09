import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ParcelExplorerPage } from './pages/ParcelExplorerPage.jsx';
import { UnifiedViewPage } from './pages/UnifiedViewPage.jsx';
import { AuditPage } from './pages/AuditPage.jsx';
import { GisMapPage } from './pages/GisMapPage.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedParcelId, setSelectedParcelId] = useState('P001');

  const handleNavigateToParcel = (parcelId) => {
    setSelectedParcelId(parcelId);
    setActiveTab('unified');
  };

  const handleGlobalSearch = (query) => {
    if (query && query.trim()) {
      // If matches a known parcel ID pattern, switch to unified view or explorer
      setActiveTab('explorer');
    }
  };

  return (
    <AppLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onSearch={handleGlobalSearch}
    >
      {activeTab === 'dashboard' && (
        <DashboardPage onNavigateToParcel={handleNavigateToParcel} />
      )}
      {activeTab === 'explorer' && (
        <ParcelExplorerPage onSelectParcel={handleNavigateToParcel} />
      )}
      {activeTab === 'unified' && (
        <UnifiedViewPage
          selectedParcelId={selectedParcelId}
          onSelectParcel={setSelectedParcelId}
        />
      )}
      {activeTab === 'gis-map' && <GisMapPage />}
      {activeTab === 'audit' && <AuditPage />}
    </AppLayout>
  );
}
