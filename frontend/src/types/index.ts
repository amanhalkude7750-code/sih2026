/**
 * Core Domain Types for SIH 2026:
 * Integrated GIS-based Digital Public Infrastructure for Land Governance
 * 
 * Central Domain Identifier: parcel_id
 */

export type UserRole = 
  | 'Administrator'
  | 'Revenue Officer'
  | 'Survey Officer'
  | 'Citizen';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  designation: string;
  department: string;
  jurisdiction: string;
  avatar_url?: string;
  phone?: string;
}

export interface AuthSession {
  user: UserProfile;
  token: string;
  authenticated_at: string;
  role: UserRole;
}

export type LandUseType = 
  | 'Agricultural'
  | 'Residential'
  | 'Commercial'
  | 'Industrial'
  | 'Forest / Eco-Sensitive'
  | 'Government / Public Utility'
  | 'Water Body';

export type ParcelStatus = 
  | 'Active'
  | 'Disputed'
  | 'Pending Mutation'
  | 'Locked'
  | 'Archived';

export type OwnershipType = 
  | 'Sole Owner'
  | 'Joint Tenancy'
  | 'Ancestral / Coparcenary'
  | 'Government Lease'
  | 'Corporate Entity';

export type RecordType = 
  | '7/12 Extract'
  | '8A Khata'
  | 'Mutation Entry (Ferfar)'
  | 'Record of Rights (RoR)'
  | 'Property Card (City Survey)'
  | 'Spatial Cadastral Map';

export type DocumentType = 
  | 'Registered Sale Deed'
  | 'Encumbrance Certificate'
  | 'Title Clearance Certificate'
  | 'Panchayat NOC'
  | 'Survey & Demarcation Map'
  | 'Court Order / Stay Notice'
  | 'Tax Clearance Receipt';

export type TransactionType = 
  | 'Sale / Conveyance'
  | 'Inheritance / Succession'
  | 'Gift Deed'
  | 'Partition / Division'
  | 'Bank Mortgage / Lien'
  | 'Government Acquisition';

export type DisputeStatus = 
  | 'Under Hearing'
  | 'Stay Order Active'
  | 'Disposed / Resolved'
  | 'Mediation Proposed'
  | 'Appealed to High Court';

/**
 * 1. Parcel (Core Spatial Entity)
 */
export interface Parcel {
  parcel_id: string; // Central Identifier, e.g. "P001"
  survey_number: string; // e.g. "124/2"
  sub_division?: string; // e.g. "A"
  ulpin?: string; // Unique Land Parcel Identification Number (Bhu-Aadhaar)
  village: string;
  taluka: string;
  district: string;
  state: string;
  area: number; // Area in specified unit
  area_unit: 'Hectares' | 'Acres' | 'Sq. Meters';
  land_use: LandUseType;
  status: ParcelStatus;
  market_valuation_inr?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  boundary_geojson?: any;
  created_at: string;
  updated_at: string;
}

/**
 * 2. Owner (Identity & Title Holder)
 */
export interface Owner {
  owner_id: string;
  parcel_id: string; // Foreign key
  full_name: string;
  guardian_name?: string;
  aadhaar_hash?: string; // Masked/Hashed identifier for privacy
  pan_number?: string;
  share_percentage: number; // e.g. 50.0 (50%)
  ownership_type: OwnershipType;
  contact_phone?: string;
  contact_email?: string;
  address: string;
  is_primary: boolean;
  acquired_date: string;
}

/**
 * 3. LandRecord (Statutory Land Records, 7/12, Mutation)
 */
export interface LandRecord {
  record_id: string;
  parcel_id: string; // Foreign key
  record_type: RecordType;
  record_number: string; // e.g., "7/12-2024-0091"
  mutation_no?: string; // Ferfar number
  issue_date: string;
  issuing_authority: string; // e.g., "Talathi / Revenue Department"
  digital_signature_verified: boolean;
  verification_hash: string;
  remarks?: string;
  status: 'Verified' | 'Under Mutation' | 'Superseded';
}

/**
 * 4. Document (Verified Digital Public Artifacts)
 */
export interface Document {
  document_id: string;
  parcel_id: string; // Foreign key
  title: string;
  document_type: DocumentType;
  document_number: string; // Statutory or registration reference
  file_url: string;
  file_size_kb: number;
  mime_type: string;
  uploaded_at: string;
  verified_by: string;
  is_verified: boolean;
  status: 'Verified' | 'Pending Verification' | 'Archived';
  blockchain_txn_hash?: string;
}

/**
 * 5. Transaction (Historical & Registered Transfers)
 */
export interface Transaction {
  transaction_id: string;
  parcel_id: string; // Foreign key
  transaction_type: TransactionType;
  from_party: string;
  to_party: string;
  registration_number: string; // SRO Registry No
  sub_registrar_office: string;
  transaction_date: string;
  consideration_amount_inr: number;
  stamp_duty_paid_inr: number;
  status: 'Completed' | 'Pending Registration' | 'Challenged' | 'Cancelled';
}

export type DisputeStatus = 
  | 'Pending'
  | 'Under Review'
  | 'Resolved'
  | 'Rejected'
  | 'Under Hearing'
  | 'Stay Order Active'
  | 'Disposed / Resolved';

/**
 * 6. Dispute (Litigation & Encumbrance Status)
 */
export interface Dispute {
  dispute_id: string;
  parcel_id: string; // Foreign key
  case_number?: string;
  dispute_type: string;
  filing_date: string;
  authority: string; // Court or Revenue Authority
  court_authority?: string;
  status: 'Pending' | 'Under Review' | 'Resolved' | 'Rejected' | string;
  description: string;
  summary?: string;
  plaintiff?: string;
  respondent?: string;
  stay_order?: boolean;
  next_hearing_date?: string;
}

/**
 * 7. AuditEntry (Tamper-evident Governance Trail)
 */
export interface AuditEntry {
  audit_id: string;
  parcel_id: string; // Foreign key
  timestamp: string;
  actor: string;
  performed_by?: string;
  role: string;
  user_role?: UserRole | 'System Automated' | string;
  action: 'CREATED' | 'UPDATED' | 'MUTATION_REQUESTED' | 'RECORD_VERIFIED' | 'DISPUTE_FILED' | 'STATUS_CHANGED' | string;
  description: string;
  changes_summary?: string;
  ip_address?: string;
  previous_state?: Record<string, any>;
  new_state?: Record<string, any>;
}

/**
 * 8. Unified Parcel View (Aggregate Core Domain Model)
 * One Parcel -> One Unified View
 */
export interface UnifiedParcelView {
  parcel: Parcel;
  owners: Owner[];
  landRecords: LandRecord[];
  documents: Document[];
  transactions: Transaction[];
  disputes: Dispute[];
  auditTrail: AuditEntry[];
}
