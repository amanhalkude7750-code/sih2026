/**
 * Realistic Mock Digital Land Documents
 * Linked by parcel_id
 */

export const mockDocuments = [
  {
    document_id: "DOC-001",
    parcel_id: "P001",
    title: "Registered Sale Deed - Vol 418/Page 92",
    document_type: "Registered Sale Deed",
    document_number: "SRO-AUSA-2015-DOC-1849",
    file_url: "/docs/P001_SaleDeed_2015.pdf",
    file_size_kb: 2450,
    mime_type: "application/pdf",
    uploaded_at: "2021-03-15T10:00:00Z",
    verified_by: "Sub-Registrar Office, Ausa",
    is_verified: true,
    status: "Verified",
    blockchain_txn_hash: "0x8f2d...3a91"
  },
  {
    document_id: "DOC-002",
    parcel_id: "P001",
    title: "Cadastral Survey Map & Demarcation Certificate",
    document_type: "Survey & Demarcation Map",
    document_number: "DILR-LTR-MAP-2021-042",
    file_url: "/docs/P001_Cadastral_Map.pdf",
    file_size_kb: 4890,
    mime_type: "application/pdf",
    uploaded_at: "2021-04-02T11:30:00Z",
    verified_by: "District Land Records Surveyor",
    is_verified: true,
    status: "Verified",
    blockchain_txn_hash: "0x4e1a...99bf"
  },
  {
    document_id: "DOC-003",
    parcel_id: "P001",
    title: "Non-Encumbrance Certificate (30 Years)",
    document_type: "Encumbrance Certificate",
    document_number: "ENC-AUSA-2024-00192",
    file_url: "/docs/P001_Encumbrance_Cert.pdf",
    file_size_kb: 1120,
    mime_type: "application/pdf",
    uploaded_at: "2024-01-10T14:20:00Z",
    verified_by: "Sub-Registrar Office, Ausa",
    is_verified: true,
    status: "Verified",
    blockchain_txn_hash: "0x33cf...12da"
  },
  {
    document_id: "DOC-004",
    parcel_id: "P002",
    title: "NA Conversion NOC Application & Town Planning Draft",
    document_type: "Panchayat NOC",
    document_number: "NOC-TP-2024-441",
    file_url: "/docs/P002_NA_Conversion_Draft.pdf",
    file_size_kb: 3200,
    mime_type: "application/pdf",
    uploaded_at: "2024-08-20T09:00:00Z",
    verified_by: "Town Planning Department, Latur",
    is_verified: false,
    status: "Pending Verification",
    blockchain_txn_hash: "Pending"
  },
  {
    document_id: "DOC-005",
    parcel_id: "P003",
    title: "Civil Court Interim Injunction & Notice",
    document_type: "Court Order / Stay Notice",
    document_number: "COURT-NLG-INJ-2023-88",
    file_url: "/docs/P003_Stay_Order_LCC452.pdf",
    file_size_kb: 1850,
    mime_type: "application/pdf",
    uploaded_at: "2023-08-16T15:10:00Z",
    verified_by: "Civil Court Registrar, Nilanga",
    is_verified: true,
    status: "Verified",
    blockchain_txn_hash: "0x77aa...88cc"
  },
  {
    document_id: "DOC-006",
    parcel_id: "P004",
    title: "Building Sanction Plan & Property Card Copy",
    document_type: "Title Clearance Certificate",
    document_number: "MC-LTR-BLD-2022-108",
    file_url: "/docs/P004_Building_Plan_Sanction.pdf",
    file_size_kb: 5120,
    mime_type: "application/pdf",
    uploaded_at: "2022-02-20T16:00:00Z",
    verified_by: "Municipal Town Planner, Latur",
    is_verified: true,
    status: "Verified",
    blockchain_txn_hash: "0x992e...11af"
  },
  {
    document_id: "DOC-007",
    parcel_id: "P005",
    title: "MIDC Industrial Consent to Operate & Fire NOC",
    document_type: "Title Clearance Certificate",
    document_number: "MIDC-REN-IND-2018-02",
    file_url: "/docs/P005_MIDC_Industrial_Consent.pdf",
    file_size_kb: 6700,
    mime_type: "application/pdf",
    uploaded_at: "2018-06-01T12:00:00Z",
    verified_by: "MIDC Regional Officer, Latur",
    is_verified: true,
    status: "Verified",
    blockchain_txn_hash: "0xbb81...34fe"
  }
];
