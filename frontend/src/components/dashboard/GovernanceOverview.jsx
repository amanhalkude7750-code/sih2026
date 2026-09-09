import React, { useEffect, useState, useRef } from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner.jsx';
import { parcelService } from '../../services/parcelService.js';
import { OperationalMetrics } from './OperationalMetrics.jsx';
import { WorkflowGuide } from './WorkflowGuide.jsx';
import { QuickParcelSearch } from './QuickParcelSearch.jsx';
import { GISOverviewCard } from './GISOverviewCard.jsx';
import { RecentParcelsTable } from './RecentParcelsTable.jsx';
import { RecentActivityFeed } from './RecentActivityFeed.jsx';

export const GovernanceOverview = ({ onNavigateToParcel, onOpenFullGIS }) => {
  const [stats, setStats] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, parcelsRes, activityRes] = await Promise.all([
          parcelService.getGovernanceStats(),
          parcelService.getParcels(),
          parcelService.getRecentActivity(5),
        ]);
        setStats(statsRes.data);
        setParcels(parcelsRes.data || []);
        setActivities(activityRes.data || []);
      } catch (err) {
        console.error('Failed to load land governance dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSelectSample = (parcelId) => {
    if (onNavigateToParcel) {
      onNavigateToParcel(parcelId);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Aggregating land governance analytics & cadastral layers..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* 1. Operational Key Governance Metrics (5 Core Indicators) */}
      <OperationalMetrics
        stats={stats}
        onMetricClick={(metricId) => {
          if (metricId === 'total-parcels' && onOpenFullGIS) {
            onOpenFullGIS();
          }
        }}
      />

      {/* 2. Workflow Guide: Search -> Select -> Inspect */}
      <WorkflowGuide
        onSearchFocus={handleSearchFocus}
        onSelectSample={handleSelectSample}
        onOpenGIS={onOpenFullGIS}
      />

      {/* 3. Quick Parcel Search Bar with Instant Autocomplete */}
      <QuickParcelSearch
        searchInputRef={searchInputRef}
        onSelectParcel={onNavigateToParcel}
      />

      {/* 4. Two-Column Operational Layout: GIS Spatial Overview + Live Governance Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
      >
        {/* Left / Main Column: Cadastral GIS Spatial Overview */}
        <div style={{ minWidth: 0 }}>
          <GISOverviewCard
            onNavigateToParcel={onNavigateToParcel}
            onOpenFullGIS={onOpenFullGIS}
          />
        </div>

        {/* Right Column: Real-time Activity / Audit Stream */}
        <div style={{ minWidth: 0 }}>
          <RecentActivityFeed
            activities={activities}
            onNavigateToParcel={onNavigateToParcel}
          />
        </div>
      </div>

      {/* 5. Cadastral Land Parcels & Survey Records Table */}
      <RecentParcelsTable
        parcels={parcels}
        onNavigateToParcel={onNavigateToParcel}
      />
    </div>
  );
};
