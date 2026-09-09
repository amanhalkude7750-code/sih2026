/**
 * Mock Authentication Service
 * 
 * Manages prototype session state and role switching for SIH Demo.
 * Persists session in localStorage so page reloads do not break the session.
 */

const STORAGE_KEY = 'geoland_auth_session';

export const MOCK_ROLES = {
  Administrator: {
    id: 'admin',
    name: 'Administrator',
    label: 'State DPI Admin',
    description: 'Full oversight of cadastral spatial database, system audit policies, and integration endpoints.',
    badgeColor: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    icon: 'Shield',
    defaultUser: {
      id: 'USR-ADM-01',
      email: 'admin.dpi@maharashtra.gov.in',
      full_name: 'Rajesh Sharma',
      role: 'Administrator',
      designation: 'Chief State Land Governance Officer',
      department: 'Department of Revenue & Land Records',
      jurisdiction: 'State of Maharashtra',
      phone: '+91 22 2202 5410',
    },
    capabilities: [
      'Master cadastral database control',
      'System-wide tamper audit inspection',
      'Global API configuration & telemetry',
      'User role assignment & access control'
    ]
  },
  'Revenue Officer': {
    id: 'revenue_officer',
    name: 'Revenue Officer',
    label: 'Tehsildar / Talathi',
    description: 'Authority to process Ferfar mutations, issue digitally signed 7/12 extracts, and record encumbrances.',
    badgeColor: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    icon: 'FileCheck',
    defaultUser: {
      id: 'USR-REV-02',
      email: 'tehsildar.ausa@maharashtra.gov.in',
      full_name: 'Anand Kulkarni',
      role: 'Revenue Officer',
      designation: 'Sub-Divisional Tehsildar & Mutation Officer',
      department: 'Revenue Circle Office, Ausa',
      jurisdiction: 'Ausa Taluka, Latur District',
      phone: '+91 2381 220145',
    },
    capabilities: [
      'Approve / reject Ferfar mutation notices',
      'Issue DSC cryptographically signed 7/12 extracts',
      'Inscribe court stay orders and dispute flags',
      'Verify registered conveyance deeds'
    ]
  },
  'Survey Officer': {
    id: 'survey_officer',
    name: 'Survey Officer',
    label: 'DILR / Cadastral Surveyor',
    description: 'Responsible for ETS electronic demarcation, polygon vertex validation, and GeoJSON cadastral updates.',
    badgeColor: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.15)',
    icon: 'MapPin',
    defaultUser: {
      id: 'USR-SRV-03',
      email: 'surveyor.latur@dilr.gov.in',
      full_name: 'Suresh Deshpande',
      role: 'Survey Officer',
      designation: 'District Inspector of Land Records (DILR)',
      department: 'Land Records & Cadastral Survey Division',
      jurisdiction: 'Latur District Division',
      phone: '+91 2382 244510',
    },
    capabilities: [
      'Cadastral boundary demarcation & ETS survey',
      'Spatial GeoJSON vector polygon validation',
      'Overlap & encroachment clash detection',
      'Issue survey demarcation certificates'
    ]
  },
  Citizen: {
    id: 'citizen',
    name: 'Citizen',
    label: 'Landowner / Applicant',
    description: 'Transparent citizen self-service for title verification, 7/12 downloads, mutation tracking, and dispute alerts.',
    badgeColor: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    icon: 'User',
    defaultUser: {
      id: 'USR-CTZ-04',
      email: 'rameshwar.deshmukh@gmail.com',
      full_name: 'Rameshwar Balaji Deshmukh',
      role: 'Citizen',
      designation: 'Registered Landholder & Citizen Applicant',
      department: 'Aadhaar Verified Citizen Account',
      jurisdiction: 'Example Village, Ausa, Latur',
      phone: '+91 98223 45671',
    },
    capabilities: [
      'One-click instant 7/12 & 8A extract lookup',
      'Track real-time Ferfar mutation status',
      'Submit dispute grievances & encumbrance queries',
      'View registered title history & boundary map'
    ]
  }
};

export const authService = {
  /**
   * Get active session from localStorage
   */
  getSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored session', e);
    }
    return null;
  },

  /**
   * Mock login with email, password, and selected role
   */
  async login({ email, password, role = 'Administrator' }) {
    await new Promise((resolve) => setTimeout(resolve, 150)); // simulated latency

    const roleConfig = MOCK_ROLES[role] || MOCK_ROLES.Administrator;
    const userProfile = {
      ...roleConfig.defaultUser,
      email: email || roleConfig.defaultUser.email,
    };

    const session = {
      user: userProfile,
      token: `mock-jwt-${roleConfig.id}-${Date.now()}`,
      authenticated_at: new Date().toISOString(),
      role: roleConfig.name,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Quick demo login by role directly
   */
  async demoLogin(roleName) {
    const roleConfig = MOCK_ROLES[roleName] || MOCK_ROLES.Administrator;
    return this.login({
      email: roleConfig.defaultUser.email,
      password: 'demopassword',
      role: roleConfig.name,
    });
  },

  /**
   * Switch active user role during session
   */
  switchRole(roleName) {
    const roleConfig = MOCK_ROLES[roleName];
    if (!roleConfig) throw new Error(`Invalid role: ${roleName}`);

    const currentSession = this.getSession();
    const newSession = {
      user: {
        ...roleConfig.defaultUser,
      },
      token: currentSession?.token || `mock-jwt-${roleConfig.id}-${Date.now()}`,
      authenticated_at: currentSession?.authenticated_at || new Date().toISOString(),
      role: roleConfig.name,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    return newSession;
  },

  /**
   * Terminate current session
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
