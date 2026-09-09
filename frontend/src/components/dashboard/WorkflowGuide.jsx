import React from 'react';
import { Search, MapPin, FileText, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const WorkflowGuide = ({ onSearchFocus, onSelectSample, onOpenGIS }) => {
  const steps = [
    {
      step: '1',
      title: 'Search Parcel',
      description: 'Find by Parcel ID (P001), Survey No (124/2), Village, or Owner Name.',
      icon: Search,
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.15)',
      actionText: 'Focus Search',
      onClick: onSearchFocus,
    },
    {
      step: '2',
      title: 'Select Parcel',
      description: 'Highlight Cadastral boundaries, inspect coordinates & spatial context.',
      icon: MapPin,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
      actionText: 'Open GIS Studio',
      onClick: onOpenGIS,
    },
    {
      step: '3',
      title: 'Inspect Unified Dossier',
      description: 'One single pane of glass: RoR 7/12, Ownership, Documents, Disputes & Audits.',
      icon: FileText,
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.15)',
      actionText: 'Inspect P001',
      onClick: () => onSelectSample && onSelectSample('P001'),
    },
  ];

  return (
    <div
      className="card"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        padding: '1.25rem 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Banner Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={18} style={{ color: 'var(--primary-400)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Core Governance Workflow: One Parcel → One Unified View
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quick Demo Sample:</span>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onSelectSample && onSelectSample('P001')}
            style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}
          >
            P001 (Agricultural)
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onSelectSample && onSelectSample('P003')}
            style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}
          >
            P003 (Disputed)
          </button>
        </div>
      </div>

      {/* 3 Step Progression Flow */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          position: 'relative',
        }}
      >
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: item.bg,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              </div>

              {item.actionText && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={item.onClick}
                    style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
