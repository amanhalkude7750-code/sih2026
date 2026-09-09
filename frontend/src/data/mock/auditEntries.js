/**
 * Realistic Mock Tamper-Evident Audit Trail
 * Chronological ledger linked by parcel_id
 * Fields: timestamp | actor | role | action | description | parcel_id
 */

export const mockAuditEntries = [
  {
    audit_id: "AUD-2021-001",
    parcel_id: "P001",
    timestamp: "2021-03-15T09:30:00Z",
    actor: "P. R. Shinde (Cadastral Officer)",
    performed_by: "P. R. Shinde (Cadastral Officer)",
    role: "Survey Officer",
    user_role: "Surveyor",
    action: "CREATED",
    description: "Initial cadastral parcel digitized and indexed with Survey No 124/2 following ETS baseline survey.",
    changes_summary: "Initial cadastral parcel digitized and indexed with Survey No 124/2 following ETS baseline survey.",
    ip_address: "10.24.110.15",
    previous_state: null,
    new_state: { status: "Active", area: 2.45, land_use: "Agricultural" }
  },
  {
    audit_id: "AUD-2021-002",
    parcel_id: "P001",
    timestamp: "2021-03-16T14:15:00Z",
    actor: "Sub-Registrar Ausa Circle",
    performed_by: "Sub-Registrar Ausa Circle",
    role: "Revenue Officer",
    user_role: "Revenue Officer",
    action: "STATUS_CHANGED",
    description: "Registered Conveyance Deed Vol 418/Page 92 recorded. Ownership assigned to Rameshwar & Sunita Deshmukh.",
    changes_summary: "Registered Conveyance Deed Vol 418/Page 92 recorded. Ownership assigned to Rameshwar & Sunita Deshmukh.",
    ip_address: "10.24.110.18",
    previous_state: { owner: "Shivaji Keshav Kadam" },
    new_state: { owner: "Rameshwar Balaji Deshmukh & Sunita R. Deshmukh" }
  },
  {
    audit_id: "AUD-2024-003",
    parcel_id: "P001",
    timestamp: "2024-04-10T11:20:00Z",
    actor: "M. K. Joshi (Talathi)",
    performed_by: "M. K. Joshi (Talathi)",
    role: "Revenue Officer",
    user_role: "Revenue Officer",
    action: "RECORD_VERIFIED",
    description: "Digitally signed DSC 7/12 Extract issued and recorded with hash SHA256:e3b0c44...",
    changes_summary: "Digitally signed DSC 7/12 Extract issued and recorded with hash SHA256:e3b0c44...",
    ip_address: "10.24.110.42",
    previous_state: { record_status: "Pending" },
    new_state: { record_status: "Verified", verification_hash: "SHA256:e3b0c44..." }
  },
  {
    audit_id: "AUD-2024-004",
    parcel_id: "P002",
    timestamp: "2024-08-28T14:10:00Z",
    actor: "Vikas Patil (Citizen/Applicant)",
    performed_by: "Vikas Patil (Citizen/Applicant)",
    role: "Citizen",
    user_role: "Citizen",
    action: "MUTATION_REQUESTED",
    description: "Application FERFAR-4902 submitted for Agricultural to Commercial Non-Agricultural (NA) conversion.",
    changes_summary: "Application FERFAR-4902 submitted for Agricultural to Commercial Non-Agricultural (NA) conversion.",
    ip_address: "49.36.12.88",
    previous_state: { status: "Active" },
    new_state: { status: "Pending Mutation" }
  },
  {
    audit_id: "AUD-2024-005",
    parcel_id: "P002",
    timestamp: "2024-08-30T16:45:00Z",
    actor: "SDO Revenue Officer",
    performed_by: "SDO Revenue Officer",
    role: "Revenue Officer",
    user_role: "Revenue Officer",
    action: "DISPUTE_FILED",
    description: "Boundary conflict objection lodged by Survey 88/1A owner. Hearing notice scheduled.",
    changes_summary: "Boundary conflict objection lodged by Survey 88/1A owner. Hearing notice scheduled.",
    ip_address: "10.24.110.02",
    previous_state: { dispute_status: "None" },
    new_state: { dispute_status: "Pending", case: "REV/RTS/2024/91" }
  },
  {
    audit_id: "AUD-2023-006",
    parcel_id: "P003",
    timestamp: "2023-08-16T10:05:00Z",
    actor: "Registrar, Civil Court Senior Division",
    performed_by: "Registrar, Civil Court Senior Division",
    role: "Revenue Officer",
    user_role: "Revenue Officer",
    action: "DISPUTE_FILED",
    description: "Interim stay order injunction registered. Conveyance transfers locked until case disposition.",
    changes_summary: "Interim stay order injunction registered. Conveyance transfers locked until case disposition.",
    ip_address: "10.88.2.19",
    previous_state: { status: "Active", stay_order: false },
    new_state: { status: "Disputed", stay_order: true }
  },
  {
    audit_id: "AUD-2022-007",
    parcel_id: "P004",
    timestamp: "2022-02-14T15:30:00Z",
    actor: "City Survey Officer",
    performed_by: "City Survey Officer",
    role: "Revenue Officer",
    user_role: "Revenue Officer",
    action: "STATUS_CHANGED",
    description: "Updated title holder from Mahalaxmi Builders to Priyanka Santosh Kulkarni following registered deed execution.",
    changes_summary: "Updated title holder from Mahalaxmi Builders to Priyanka Santosh Kulkarni following registered deed execution.",
    ip_address: "10.24.110.12",
    previous_state: { owner: "Mahalaxmi Builders" },
    new_state: { owner: "Priyanka Santosh Kulkarni" }
  }
];
