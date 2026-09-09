import React, { useState } from 'react';
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Calendar,
  XCircle,
  Clock,
  Search,
  Filter,
  FileText,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters.js';
import { EmptyState } from '../ui/EmptyState.jsx';

// Status badge mapping for the 4 core dispute statuses
const disputeStatusConfig = {
  Pending: {
    label: 'Pending Hearing',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.3)',
    icon: Clock,
  },
  'Under Review': {
    label: 'Under Review',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.15)',
    border: 'rgba(56, 189, 248, 0.3)',
    icon: Scale,
  },
  Resolved: {
    label: 'Resolved / Disposed',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.3)',
    icon: CheckCircle2,
  },
  Rejected: {
    label: 'Rejected / Dismissed',
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.15)',
    border: 'rgba(148, 163, 184, 0.3)',
    icon: XCircle,
  },
};

export const DisputeAlerts = ({ disputes = [] }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  if (!disputes.length) {
    return (
      <div
        className="card"
        style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)',
            color: 'var(--primary-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <CheckCircle2 size={28} />
        </div>
        <div>
          <h4 style={{ color: 'var(--primary-400)', fontSize: '1.1rem', fontWeight: 700 }}>
            Clean Encumbrance & Dispute Free
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            No civil suits, boundary conflicts, or stay orders are registered against this parcel.
            Title is certified unencumbered and clear for public land governance decisions.
          </p>
        </div>
      </div>
    );
  }

  const filteredDisputes = disputes.filter((disp) => {
    const matchesStatus =
      selectedStatus === 'All' ||
      disp.status === selectedStatus ||
      (selectedStatus === 'Resolved' && disp.status === 'Disposed / Resolved') ||
      (selectedStatus === 'Under Review' && (disp.status === 'Under Hearing' || disp.status === 'Stay Order Active'));

    if (!matchesStatus) return false;

    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      disp.dispute_id.toLowerCase().includes(query) ||
      disp.dispute_type.toLowerCase().includes(query) ||
      (disp.authority && disp.authority.toLowerCase().includes(query)) ||
      (disp.court_authority && disp.court_authority.toLowerCase().includes(query)) ||
      (disp.description && disp.description.toLowerCase().includes(query)) ||
      (disp.plaintiff && disp.plaintiff.toLowerCase().includes(query)) ||
      (disp.case_number && disp.case_number.toLowerCase().includes(query))
    );
  });

  const statusesList = ['All', 'Pending', 'Under Review', 'Resolved', 'Rejected'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Controls Bar: Search & Status Filter */}
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
            placeholder="Search disputes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter Chips */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {statusesList.map((status) => {
            const isActive = selectedStatus === status;
            return (
              <button
                key={status}
                type="button"
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedStatus(status)}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Disputes List */}
      {filteredDisputes.length === 0 ? (
        <EmptyState
          title="No Matching Disputes"
          description={`No disputes match the filter status "${selectedStatus}".`}
          action={
            <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedStatus('All'); setSearchTerm(''); }}>
              Reset Filters
            </button>
          }
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredDisputes.map((disp) => {
            const normalizedStatus =
              disp.status === 'Disposed / Resolved'
                ? 'Resolved'
                : disp.status === 'Stay Order Active' || disp.status === 'Under Hearing'
                ? 'Under Review'
                : disp.status;

            const cfg = disputeStatusConfig[normalizedStatus] || disputeStatusConfig['Under Review'];
            const StatusIcon = cfg.icon;
            const isResolved = normalizedStatus === 'Resolved' || normalizedStatus === 'Rejected';

            return (
              <div
                key={disp.dispute_id}
                className="card"
                style={{
                  background: isResolved ? '#ffffff' : '#fdf6f4',
                  border: isResolved ? '1px solid var(--border-subtle)' : '1px solid var(--status-dispute-border)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        background: cfg.bg,
                        color: cfg.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <StatusIcon size={22} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {disp.dispute_type}
                        </h4>
                        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--primary-600)', background: 'var(--bg-surface-hover)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                          ID: {disp.dispute_id}
                        </span>
                        {disp.case_number && (
                          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', background: '#e8f4fd', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                            Case #{disp.case_number}
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Authority: <strong style={{ color: 'var(--text-main)' }}>{disp.authority || disp.court_authority}</strong> • Filed: {formatDate(disp.filing_date)}
                      </div>
                    </div>
                  </div>

                  {/* Prominent Status Pill */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.border}`,
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.color }} />
                      {cfg.label}
                    </span>
                  </div>
                </div>

                {/* Description Body */}
                <div
                  style={{
                    background: 'var(--bg-surface-hover)',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.6,
                    borderLeft: `3px solid ${cfg.color}`,
                  }}
                >
                  <strong>Case Description: </strong>
                  {disp.description || disp.summary}
                </div>

                {/* Footnote Metadata */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    {disp.plaintiff && (
                      <div>Plaintiff: <strong style={{ color: 'var(--text-main)' }}>{disp.plaintiff}</strong></div>
                    )}
                    {disp.respondent && (
                      <div>Respondent: <strong style={{ color: 'var(--text-main)' }}>{disp.respondent}</strong></div>
                    )}
                    <div>Parcel Key: <span className="mono" style={{ color: 'var(--primary-400)' }}>{disp.parcel_id}</span></div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {disp.stay_order && (
                      <div style={{ color: 'var(--accent-rose)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <ShieldAlert size={14} /> Court Stay Order Active
                      </div>
                    )}
                    {disp.next_hearing_date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-blue)' }}>
                        <Calendar size={13} />
                        <span>Hearing: <strong>{formatDate(disp.next_hearing_date)}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
