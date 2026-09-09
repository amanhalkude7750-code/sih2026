import React, { useState } from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Navbar } from './Navbar.jsx';

export const AppLayout = ({ activeTab, onSelectTab, onSearch, children }) => {
  const pageTitles = {
    dashboard: 'Governance Overview & KPIs',
    explorer: 'Cadastral Parcel Explorer',
    unified: 'One Parcel → One Unified View',
    'gis-map': 'Cadastral GIS Map Engine',
    audit: 'Tamper-Evident Audit Trail',
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} onSelectTab={onSelectTab} />
      <div className="app-main">
        <Navbar
          activePageTitle={pageTitles[activeTab] || 'Land Governance DPI'}
          onSearch={onSearch}
        />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};
