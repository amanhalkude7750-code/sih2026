import React, { useState } from 'react';
import {
  Landmark,
  Shield,
  FileCheck,
  MapPin,
  User,
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { ENV } from '../config/env.js';

export const LoginPage = ({ onLoginSuccess }) => {
  const { login, demoLogin, isLoading, rolesMeta } = useAuth();
  const [email, setEmail] = useState('admin.dpi@maharashtra.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState('Administrator');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password, role: selectedRole });
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleQuickDemo = async (roleName) => {
    setError(null);
    try {
      await demoLogin(roleName);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Quick login failed');
    }
  };

  const roleIcons = {
    Administrator: Shield,
    'Revenue Officer': FileCheck,
    'Survey Officer': MapPin,
    Citizen: User,
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'radial-gradient(ellipse at top right, rgba(45, 90, 56, 0.09) 0%, #f5f8f5 70%)',
      color: 'var(--text-main)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '1120px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center',
      }}>
        {/* Left Hero & Landstack Mission */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(35, 83, 50, 0.25)',
            }}>
              <Layers size={26} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '0.04em', lineHeight: 1.1, color: 'var(--primary-700)' }}>
                LANDSTACK
              </h1>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Center for Land Governance • Digital Public Infrastructure
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 800, lineHeight: 1.25, color: 'var(--text-main)' }}>
              One Parcel <span style={{ color: 'var(--primary-600)' }}>→</span> One Unified View <span style={{ color: 'var(--primary-600)' }}>→</span> Faster Decisions
            </h2>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.6 }}>
              We bridge the gap between complex land systems and ground-level realities to ensure that
              land governance and use is inclusive, transparent, and just.
            </p>
          </div>

          {/* Key DPI Capabilities Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
              <span>Unified Cadastral Record Dossier linked to unique <strong>parcel_id</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
              <span>Tamper-evident audit ledger with DSC cryptographic verification</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
              <span>Role-based portal for Administrators, Tehsildars, Surveyors, & Citizens</span>
            </div>
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--bg-surface-hover)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            color: 'var(--primary-700)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <Sparkles size={18} />
            <span>Smart India Hackathon 2026 Prototype • Latur District Pilot</span>
          </div>
        </div>

        {/* Right Authentication Card */}
        <div className="card" style={{ padding: '2.25rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Portal Sign In</h3>
              <span className="badge badge-emerald">
                <ShieldCheck size={13} /> Secure SSO
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Sign in with your role credentials or choose a quick demo persona below
            </p>
          </div>

          {/* Quick Demo Persona Pills */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
              Quick Demo Login (One-Click for Jury)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {Object.values(rolesMeta).map((r) => {
                const Icon = roleIcons[r.name] || Shield;
                return (
                  <button
                    key={r.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleQuickDemo(r.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: '#ffffff',
                      border: `1px solid var(--border-subtle)`,
                      color: 'var(--text-main)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary-600)';
                      e.currentTarget.style.background = 'var(--bg-surface-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.background = '#ffffff';
                    }}
                  >
                    <Icon size={14} style={{ color: r.badgeColor }} />
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>or credential login</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem', fontWeight: 600 }}>
                Email / Official User ID
              </label>
              <div className="input-group">
                <Mail size={16} style={{ color: 'var(--text-dim)' }} />
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gov.in"
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem', fontWeight: 600 }}>
                Password / Digital Signature Pin
              </label>
              <div className="input-group">
                <Lock size={16} style={{ color: 'var(--text-dim)' }} />
                <input
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem', fontWeight: 600 }}>
                Select Role Authority
              </label>
              <select
                className="select-field"
                style={{ width: '100%' }}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="Administrator">Administrator (State DPI Admin)</option>
                <option value="Revenue Officer">Revenue Officer (Tehsildar / Talathi)</option>
                <option value="Survey Officer">Survey Officer (DILR / Surveyor)</option>
                <option value="Citizen">Citizen (Landowner / Buyer)</option>
              </select>
            </div>

            {error && (
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
            >
              <span>{isLoading ? 'Signing In...' : 'Proceed to Role Selection'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
