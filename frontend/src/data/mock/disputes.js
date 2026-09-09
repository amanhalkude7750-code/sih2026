/**
 * Realistic Mock Disputes Data
 * Linked by parcel_id
 * Statuses: Pending | Under Review | Resolved | Rejected
 */

export const mockDisputes = [
  {
    dispute_id: "DISP-2023-089",
    parcel_id: "P003",
    case_number: "LCC/2023/452",
    dispute_type: "Title Ownership Contest",
    filing_date: "2023-08-14",
    authority: "Civil Court Senior Division, Nilanga",
    court_authority: "Civil Court Senior Division, Nilanga",
    status: "Under Review",
    description: "Civil suit filed claiming undivided coparcenary share under ancestral Hindu Succession Act. Interim injunction stay order tagged on registry.",
    summary: "Civil suit filed claiming undivided coparcenary share under ancestral Hindu Succession Act. Interim injunction stay order tagged on registry.",
    plaintiff: "Vijaykumar Sopan Shinde (Cousin)",
    respondent: "Dnyaneshwar Sopan Shinde & Sopan Shinde",
    stay_order: true,
    next_hearing_date: "2024-11-20"
  },
  {
    dispute_id: "DISP-2024-012",
    parcel_id: "P002",
    case_number: "REV/RTS/2024/91",
    dispute_type: "Boundary Conflict",
    filing_date: "2024-08-30",
    authority: "Sub-Divisional Officer (SDO Revenue), Ausa",
    court_authority: "Sub-Divisional Officer (SDO Revenue), Ausa",
    status: "Pending",
    description: "Objection raised by adjacent landowner regarding 2-meter boundary demarcation overlap during Non-Agricultural commercial widening survey.",
    summary: "Objection raised by adjacent landowner regarding 2-meter boundary demarcation overlap during Non-Agricultural commercial widening survey.",
    plaintiff: "Adjacent Landowner (Survey 88/1A)",
    respondent: "Vikas Anandrao Patil",
    stay_order: false,
    next_hearing_date: "2024-10-15"
  },
  {
    dispute_id: "DISP-2021-004",
    parcel_id: "P001",
    case_number: "REV/APPEAL/2021/18",
    dispute_type: "Boundary Demarcation",
    filing_date: "2021-01-10",
    authority: "Tehsildar Court, Ausa",
    court_authority: "Tehsildar Court, Ausa",
    status: "Resolved",
    description: "Boundary demarcation dispute resolved amicably following joint Electronic Total Station (ETS) Cadastral re-survey by DILR on 12/03/2021.",
    summary: "Boundary demarcation dispute resolved amicably following joint Electronic Total Station (ETS) Cadastral re-survey by DILR on 12/03/2021.",
    plaintiff: "Hanumant Kadam",
    respondent: "Rameshwar Balaji Deshmukh",
    stay_order: false,
    next_hearing_date: null
  },
  {
    dispute_id: "DISP-2022-031",
    parcel_id: "P005",
    case_number: "ENV/MIDC/2022/07",
    dispute_type: "Industrial Land Encroachment Claim",
    filing_date: "2022-05-11",
    authority: "District Collectorate Revenue Tribunal, Latur",
    court_authority: "District Collectorate Revenue Tribunal, Latur",
    status: "Rejected",
    description: "Frivolous challenge against MIDC Phase 2 agro-industrial easement access road dismissed after official GPS satellite survey confirmed clear zoning.",
    summary: "Frivolous challenge against MIDC Phase 2 agro-industrial easement access road dismissed after official GPS satellite survey confirmed clear zoning.",
    plaintiff: "Private Commercial Group",
    respondent: "Marathwada Agro-Infra Tech Pvt Ltd",
    stay_order: false,
    next_hearing_date: null
  }
];
