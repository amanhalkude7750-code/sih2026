import React, { useState } from 'react';
import {
  History,
  ShieldCheck,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ArrowRight,
  PlusCircle,
  FileCheck,
  AlertTriangle,
  RefreshCw,
  Terminal,
} from 'lucide-react';
import { formatDateTime } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

const actionMetadata = {
  CREATED: {
    label: 'Parcel Digitized',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.15)',
    icon: PlusCircle,
  },
  RECORD_VERIFIED: {
    label: 'Record DSC Verified',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.15)',
    icon: ShieldCheck,
  },
  MUTATION_REQUESTED: {
    label: 'Ferfar Mutation Filed',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)',
    icon: FileCheck,
  },
  DISPUTE_FILED: {
    label: 'Litigation Dispute Tagged',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    icon: AlertTriangle,
  },
  STATUS_CHANGED: {
    label: 'Title / Status Updated',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)',
    icon: RefreshCw,
  },
};

export const AuditTimeline = ({ auditTrail = [], title = 'Chronological Governance Ledger' }) => {
  const [expandedEntries, setExpandedEntries] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('All');

  if (!auditTrail.length) {
    return (
      <EmptyState
        title="Audit Trail Empty"
        description="No historical modifications, status transitions, or administrative actions have been logged for this parcel yet."
      />
    );
  }

  const toggleExpand = (id) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Sort chronologically descending (newest events first)
  const sortedEntries = [...auditTrail].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const filtered = sortedEntries.filter((entry) => {
    if (selectedAction !== 'All' && entry.action !== selectedAction) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    const actor = (entry.actor || entry.performed_by || '').toLowerCase();
    const desc = (entry.description || entry.changes_summary || '').toLowerCase();
    const role = (entry.role || entry.user_role || '').toLowerCase();
    return (
      actor.includes(q) ||
      desc.includes(q) ||
      role.includes(q) ||
      entry.action.toLowerCase().includes(q) ||
      (entry.audit_id && entry.audit_id.toLowerCase().includes(q))
    );
  });

  const actionsList = ['All', 'CREATED', 'RECORD_VERIFIED', 'MUTATION_REQUESTED', 'DISPUTE_FILED', 'STATUS_CHANGED'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Filtering Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div className="input-group" style={{ maxWidth: '320px', width: '100%' }}>
          <Search size={15} style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {actionsList.map((act) => {
            const isActive = selectedAction === act;
            return (
              <button
                key={act}
                type="button"
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedAction(act)}
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
              >
                {act}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chronological Timeline Container */}
      <div
        className="timeline-container"
        style={{
          position: 'relative',
          paddingLeft: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {/* Continuous Vertical Timeline Backbone */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            bottom: '12px',
            left: '15px',
            width: '2px',
            background: 'linear-gradient(180deg, var(--primary-500) 0%, rgba(56, 189, 248, 0.5) 100%)',
            boxShadow: '0 0 6px rgba(16, 185, 129, 0.4)',
          }}
        />

        {filtered.map((entry, idx) => {
          const cfg = actionMetadata[entry.action] || actionMetadata.CREATED;
          const ActionIcon = cfg.icon;
          const isExpanded = expandedEntries.has(entry.audit_id);
          const hasStateDiff = entry.previous_state || entry.new_state;

          const actor = entry.actor || entry.performed_by || 'Authority';
          const role = entry.role || entry.user_role || 'Officer';
          const description = entry.description || entry.changes_summary;

          return (
            <div
              key={entry.audit_id || idx}
              style={{ position: 'relative' }}
            >
              {/* Timeline Circular Node Anchor */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '-32px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: `2px solid ${cfg.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cfg.color,
                  boxShadow: `0 0 10px ${cfg.bg}`,
                  zIndex: 2,
                }}
              >
                <ActionIcon size={16} />
              </div>

              {/* Timeline Content Card */}
              <div
                className="card card-hover"
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {/* Header: Action Tag, Actor, Role, and Timestamp */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.color}40`,
                      }}
                    >
                      {entry.action}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <User size={13} style={{ color: 'var(--text-dim)' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {actor}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--accent-blue)',
                          background: 'rgba(56, 189, 248, 0.1)',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                        }}
                      >
                        {role}
                      </span>
                    </div>
                  </div>

                  {/* Timestamp & Relative Indicator */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <Clock size={13} style={{ color: 'var(--text-dim)' }} />
                    <span className="mono">{formatDateTime(entry.timestamp)}</span>
                  </div>
                </div>

                {/* Event Description */}
                <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {description}
                </div>

                {/* Footer Metadata: Parcel Key, IP Address & State Diff Expander */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: 'var(--text-dim)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '0.6rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="mono">
                      Parcel ID: <strong style={{ color: 'var(--primary-400)' }}>{entry.parcel_id}</strong>
                    </span>
                    <span className="mono">Audit ID: {entry.audit_id}</span>
                    {entry.ip_address && <span className="mono">IP: {entry.ip_address}</span>}
                  </div>

                  {hasStateDiff && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(entry.audit_id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary-400)',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <span>{isExpanded ? 'Hide State Diff' : 'View State Diff'}</span>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  )}
                </div>

                {/* Expandable State Diff Panel */}
                {isExpanded && hasStateDiff && (
                  <div
                    style={{
                      marginTop: '0.5rem',
                      background: 'rgba(11, 15, 25, 0.6)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.85rem',
                      fontSize: '0.75rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div>
                      <div style={{ color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.25rem' }}>
                        PREVIOUS STATE
                      </div>
                      <pre className="mono" style={{ color: 'var(--accent-rose)', whiteSpace: 'pre-wrap', margin: 0 }}>
                        {entry.previous_state ? JSON.stringify(entry.previous_state, null, 2) : '(Initial Creation - Null)'}
                      </pre>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.25rem' }}>
                        UPDATED STATE
                      </div>
                      <pre className="mono" style={{ color: 'var(--primary-400)', whiteSpace: 'pre-wrap', margin: 0 }}>
                        {entry.new_state ? JSON.stringify(entry.new_state, null, 2) : '(No change)'}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
