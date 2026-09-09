/**
 * Realistic Mock Disputes Data
 * Linked by parcel_id
 */

export const mockDisputes = [
  {
    dispute_id: "DISP-2023-089",
    parcel_id: "P003",
    case_number: "LCC/2023/452",
    court_authority: "Civil Court Senior Division, Nilanga",
    dispute_type: "Title Ownership Contest",
    filing_date: "2023-08-14",
    plaintiff: "Vijaykumar Sopan Shinde (Cousin)",
    respondent: "Dnyaneshwar Sopan Shinde & Sopan Shinde",
    status: "Stay Order Active",
    stay_order: true,
    next_hearing_date: "2024-11-20",
    summary: "Civil suit filed claiming undivided coparcenary share under ancestral Hindu Succession Act. Interim injunction on sale/transfer granted."
  },
  {
    dispute_id: "DISP-2024-012",
    parcel_id: "P002",
    case_number: "REV/RTS/2024/91",
    court_authority: "Sub-Divisional Officer (SDO Revenue), Ausa",
    dispute_type: "Boundary Conflict",
    filing_date: "2024-08-30",
    plaintiff: "Adjacent Landowner (Survey 88/1A)",
    respondent: "Vikas Anandrao Patil",
    status: "Under Hearing",
    stay_order: false,
    next_hearing_date: "2024-10-15",
    summary: "Objection raised regarding 2-meter boundary demarcation overlap during NA road widening survey."
  },
  {
    dispute_id: "DISP-2021-004",
    parcel_id: "P001",
    case_number: "REV/APPEAL/2021/18",
    court_authority: "Tehsildar Court, Ausa",
    dispute_type: "Boundary Conflict",
    filing_date: "2021-01-10",
    plaintiff: "Hanumant Kadam",
    respondent: "Rameshwar Balaji Deshmukh",
    status: "Disposed / Resolved",
    stay_order: false,
    next_hearing_date: undefined,
    summary: "Boundary demarcation dispute resolved amicably following joint Electronic Total Station (ETS) re-survey by DILR on 12/03/2021."
  }
];
