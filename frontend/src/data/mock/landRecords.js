/**
 * Realistic Mock Statutory Land Records (7/12, Mutation entries, RoR)
 * Linked by parcel_id
 */

export const mockLandRecords = [
  {
    record_id: "REC-712-001",
    parcel_id: "P001",
    record_type: "7/12 Extract",
    record_number: "712-AUSA-2024-8841",
    mutation_no: "FERFAR-3819",
    issue_date: "2024-04-10",
    issuing_authority: "Talathi Office, Example Village",
    digital_signature_verified: true,
    verification_hash: "SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    remarks: "Kharif Season Jowar/Soybean crop registered. No encumbrance.",
    status: "Verified"
  },
  {
    record_id: "REC-8A-001",
    parcel_id: "P001",
    record_type: "8A Khata",
    record_number: "KHATA-8A-9921",
    mutation_no: "FERFAR-3819",
    issue_date: "2024-04-10",
    issuing_authority: "Talathi Office, Example Village",
    digital_signature_verified: true,
    verification_hash: "SHA256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    remarks: "Land revenue cess paid up to March 2025.",
    status: "Verified"
  },
  {
    record_id: "REC-MUT-002",
    parcel_id: "P002",
    record_type: "Mutation Entry (Ferfar)",
    record_number: "FERFAR-4902",
    mutation_no: "FERFAR-4902",
    issue_date: "2024-08-28",
    issuing_authority: "Circle Officer, Ausa Circle",
    digital_signature_verified: false,
    verification_hash: "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    remarks: "Application for Non-Agricultural (NA) commercial conversion pending notice period.",
    status: "Under Mutation"
  },
  {
    record_id: "REC-712-003",
    parcel_id: "P003",
    record_type: "7/12 Extract",
    record_number: "712-NLG-2023-1102",
    mutation_no: "FERFAR-2104",
    issue_date: "2023-10-15",
    issuing_authority: "Talathi Office, Alanga",
    digital_signature_verified: true,
    verification_hash: "SHA256:ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    remarks: "Dispute note inscribed by Civil Court order dated 14/08/2023.",
    status: "Verified"
  },
  {
    record_id: "REC-ROR-004",
    parcel_id: "P004",
    record_type: "Property Card (City Survey)",
    record_number: "CTSO-LTR-78122",
    mutation_no: "FERFAR-6610",
    issue_date: "2022-02-14",
    issuing_authority: "City Survey Officer, Latur",
    digital_signature_verified: true,
    verification_hash: "SHA256:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    remarks: "Residential building permission granted by Municipal Corporation.",
    status: "Verified"
  },
  {
    record_id: "REC-712-005",
    parcel_id: "P005",
    record_type: "7/12 Extract",
    record_number: "712-REN-2024-4011",
    mutation_no: "FERFAR-5520",
    issue_date: "2024-01-12",
    issuing_authority: "Talathi Office, Pangaon",
    digital_signature_verified: true,
    verification_hash: "SHA256:4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    remarks: "Industrial Class 1 conversion approved. Agro-processing unit active.",
    status: "Verified"
  },
  {
    record_id: "REC-ROR-006",
    parcel_id: "P006",
    record_type: "Record of Rights (RoR)",
    record_number: "ROR-UDG-1985-001",
    mutation_no: "FERFAR-0045",
    issue_date: "1985-04-01",
    issuing_authority: "Tehsildar Office, Udgir",
    digital_signature_verified: true,
    verification_hash: "SHA256:ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
    remarks: "Reserved Forest Zone - Section 4 Notification active. Non-transferable.",
    status: "Verified"
  }
];
