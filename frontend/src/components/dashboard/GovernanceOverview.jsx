import React, { useEffect, useState } from 'react';
import { Layers, CheckCircle, AlertTriangle, FileText, Scale, TrendingUp } from 'lucide-react';
import { StatCard } from '../ui/StatCard.jsx';
import { LoadingSpinner } from '../ui/LoadingSpinner.jsx';
import { parcelService } from '../../services/parcelService.js';
import { formatCurrencyINR } from '../../utils/formatters.js';

export const GovernanceOverview = ({ onNavigateToParcel }) => {
  const [stats, setStats] = useState(null);
  const [recentParcels, setRecentParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, parcelsRes] = await Promise.all([
          parcelService.getGovernanceStats(),
          parcelService.getParcels(),
        ]);
        setStats(statsRes.data);
        setRecentParcels(parcelsRes.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load governance stats', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <LoadingSpinner message="Calculating governance indicators..." />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* KPI Stats Grid */}
      <div className="grid-cols-4">
        <StatCard
          title="Indexed Cadastral Parcels"
          value={stats?.totalParcels || 0}
          subtitle={`Covering ${stats?.totalAreaHectares || 0} Hectares`}
          icon={Layers}
        />
        <StatCard
          title="Verified 7/12 & RoR Records"
          value={stats?.verifiedRecords || 0}
          subtitle="Cryptographically DSC Signed"
          icon={CheckCircle}
        />
        <StatCard
          title="Active Litigation Disputes"
          value={stats?.activeDisputes || 0}
          subtitle="Under Court / SDO Hearing"
          icon={Scale}
        />
        <StatCard
          title="Total Assessed Valuation"
          value={formatCurrencyINR(stats?.totalValuation)}
          subtitle="Market Guidance Value"
          icon={TrendingUp}
        />
      </div>

      {/* Philosophy Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              One Parcel → One Unified View → Faster Land Governance Decisions
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '750px' }}>
              Integrating cadastral GIS boundary geometry with statutory 7/12 extracts, verified title holders,
              encumbrances, and immutable audit trails for seamless public land governance.
            </p>
          </div>
          <span className="badge badge-emerald" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8125rem' }}>
            Pilot District: Latur, MH
          </span>
        </div>
      </div>

      {/* Quick Access Parcels Table */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem' }}>Recently Updated Cadastral Parcels</h3>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Showing latest synchronizations
          </span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Parcel ID</th>
                <th>Survey No</th>
                <th>Village & Taluka</th>
                <th>Land Use</th>
                <th>Area</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentParcels.map((p) => (
                <tr key={p.parcel_id}>
                  <td className="mono" style={{ fontWeight: 700, color: 'var(--primary-400)' }}>
                    {p.parcel_id}
                  </td>
                  <td style={{ fontWeight: 600 }}>{p.survey_number}</td>
                  <td>{p.village}, {p.taluka}</td>
                  <td>{p.land_use}</td>
                  <td>{p.area} Ha</td>
                  <td>
                    <span className="badge badge-cyan">{p.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => onNavigateToParcel && onNavigateToParcel(p.parcel_id)}
                    >
                      Unified View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
