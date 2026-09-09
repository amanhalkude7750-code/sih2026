/**
 * Realistic Mock Tamper-Evident Audit Trail
 * Linked by parcel_id
 */

export const mockAuditEntries = [
  {
    audit_id: "AUD-001",
    parcel_id: "P001",
    action: "CREATED",
    performed_by: "DILR Cadastral Officer",
    user_role: "Surveyor",
    timestamp: "2021-03-15T09:30:00Z",
    ip_address: "10.24.110.15",
    changes_summary: "Initial cadastral parcel digitized and indexed with Survey No 124/2.",
    previous_state: null,
    new_state: { status: "Active", area: 2.45, land_use: "Agricultural" }
  },
  {
    audit_id: "AUD-002",
    parcel_id: "P001",
    action: "RECORD_VERIFIED",
    performed_by: "M. K. Joshi (Talathi)",
    user_role: "Revenue Officer",
    timestamp: "2024-04-10T11:20:00Z",
    ip_address: "10.24.110.42",
    changes_summary: "Digitally signed 7/12 Extract issued and recorded on state portal.",
    previous_state: { record_status: "Pending" },
    new_state: { record_status: "Verified", verification_hash: "SHA256:e3b0c44..." }
  },
  {
    audit_id: "AUD-003",
    parcel_id: "P002",
    action: "MUTATION_REQUESTED",
    performed_by: "Vikas Patil (Citizen/Applicant)",
    user_role: "Citizen",
    timestamp: "2024-08-28T14:10:00Z",
    ip_address: "49.36.12.88",
    changes_summary: "Application submitted for Agricultural to Commercial Non-Agricultural (NA) use.",
    previous_state: { status: "Active" },
    new_state: { status: "Pending Mutation" }
  },
  {
    audit_id: "AUD-004",
    parcel_id: "P003",
    action: "DISPUTE_FILED",
    performed_by: "Registrar, Civil Court Senior Division",
    user_role: "Revenue Officer",
    timestamp: "2023-08-16T10:05:00Z",
    ip_address: "10.88.2.19",
    changes_summary: "Injunction stay order tagged on parcel. Encumbrance flag activated.",
    previous_state: { status: "Active" },
    new_state: { status: "Disputed", stay_order: true }
  },
  {
    audit_id: "AUD-005",
    parcel_id: "P004",
    action: "STATUS_CHANGED",
    performed_by: "City Survey Officer",
    user_role: "Tehsildar",
    timestamp: "2022-02-14T15:30:00Z",
    ip_address: "10.24.110.12",
    changes_summary: "Updated ownership from Builder to Priyanka Kulkarni following sale deed registration.",
    previous_state: { owner: "Mahalaxmi Builders" },
    new_state: { owner: "Priyanka Santosh Kulkarni" }
  }
];
