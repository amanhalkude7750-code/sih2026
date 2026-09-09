import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ParcelProvider, useParcelSelection } from './context/ParcelContext.jsx';
import { AppLayout } from './components/layout/AppLayout.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RoleSelectionPage } from './pages/RoleSelectionPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ParcelExplorerPage } from './pages/ParcelExplorerPage.jsx';
import { UnifiedViewPage } from './pages/UnifiedViewPage.jsx';
import { AuditPage } from './pages/AuditPage.jsx';
import { GisMapPage } from './pages/GisMapPage.jsx';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const { selectParcel } = useParcelSelection();
  
  // Navigation & step states persisted in hash / state
  const [appStep, setAppStep] = useState(() => {
    return localStorage.getItem('geoland_auth_session') ? 'dashboard' : 'login';
  });

  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['dashboard', 'explorer', 'unified', 'gis-map', 'audit'].includes(hash)
      ? hash
      : 'dashboard';
  });

  // Keep URL hash synchronized for smooth back/forward and refresh resilience
  useEffect(() => {
    if (isAuthenticated && appStep === 'dashboard') {
      window.location.hash = activeTab;
    }
  }, [activeTab, isAuthenticated, appStep]);

  // Handle hash change from browser buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'explorer', 'unified', 'gis-map', 'audit'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Step 1: Not authenticated -> Login Page
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setAppStep('role-selection')} />;
  }

  // Step 2: Role Selection Step
  if (appStep === 'role-selection') {
    return <RoleSelectionPage onProceedToDashboard={() => setAppStep('dashboard')} />;
  }

  // Step 3: Application Shell & Dashboard Routes
  const handleNavigateToParcel = (parcelId) => {
    selectParcel(parcelId, { openInspector: true, zoomMap: true });
    setActiveTab('unified');
  };

  return (
    <AppLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <DashboardPage
          onNavigateToParcel={handleNavigateToParcel}
          onNavigateToTab={setActiveTab}
        />
      )}
      {activeTab === 'explorer' && (
        <ParcelExplorerPage onSelectParcel={handleNavigateToParcel} />
      )}
      {activeTab === 'unified' && (
        <UnifiedViewPage />
      )}
      {activeTab === 'gis-map' && (
        <GisMapPage onOpenUnifiedView={handleNavigateToParcel} />
      )}
      {activeTab === 'audit' && <AuditPage />}
    </AppLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ParcelProvider>
        <MainApp />
      </ParcelProvider>
    </AuthProvider>
  );
}
