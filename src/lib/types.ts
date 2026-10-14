export type UserRole =
  | 'citizen'
  | 'university'
  | 'student'
  | 'researcher'
  | 'industry'
  | 'government'
  | 'admin';

export type ChallengeDomain =
  | 'Water & Sanitation'
  | 'Public Health & Nutrition'
  | 'Rural Infrastructure & Mobility'
  | 'Renewable Energy & Power'
  | 'Agriculture & Soil Health'
  | 'Education & Digital Literacy'
  | 'Waste Management & Environment';

export type ChallengeStatus =
  | 'Draft / Ingestion'
  | 'AI Analyzed'
  | 'Under Human Validation'
  | 'Validated Societal Challenge'
  | 'Institutional Match'
  | 'Active Project / Prototyping'
  | 'Pilot Deployed'
  | 'Resolved & Impact Verified';

export type ConfidenceTier = 'HIGH' | 'MEDIUM' | 'LOW' | 'ESCALATED';

export interface ConsentRecord {
  allowOpenDataSharing: boolean;
  maskPersonallyIdentifiableInfo: boolean;
  allowUniversityResearchAccess: boolean;
  allowIndustryCSRContact: boolean;
  verifiedAt: string;
}

export interface ProblemReport {
  id: string;
  code: string;
  citizenNameMasked: string;
  phoneNumberMasked: string;
  district: string;
  block: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rawText: string;
  audioUrl?: string;
  language: 'English' | 'Hindi' | 'Santali' | 'Khortha';
  submissionChannel: 'Web Portal' | 'Mobile Voice Assistant' | 'Panchayat CSC Facilitator';
  categorySuggested: ChallengeDomain;
  status: 'SUBMITTED' | 'ANALYZING' | 'CLUSTERED' | 'VALIDATED' | 'MERGED';
  mediaUrls: string[];
  consent: ConsentRecord;
  createdAt: string;
  clusterId?: string;
}

export interface AIAnalysisResult {
  id: string;
  reportId: string;
  predictedDomain: ChallengeDomain;
  domainConfidence: number; // 0.00 to 1.00
  confidenceTier: ConfidenceTier;
  semanticSimilarityScore: number; // cosine similarity with nearest cluster
  matchedClusterId?: string;
  similarReportIds: string[];
  severityScore: number; // 0 to 100
  priorityFactors: {
    affectedPopulationWeight: number; // e.g. 0.35
    recurrenceWeight: number;        // e.g. 0.25
    vulnerabilityIndex: number;      // e.g. 0.20
    communityEndorsements: number;   // e.g. 0.20
  };
  keyEntities: string[];
  rationaleExplanation: string;
  humanReviewRequired: boolean;
  escalationReason?: string;
  accountableRole: 'District Moderator' | 'University Coordinator' | 'Fairness Officer';
  isOverridden: boolean;
  overrideNote?: string;
  processedAt: string;
}

export interface SocietalChallenge {
  id: string;
  code: string; // e.g. CH-JH-2026-0842
  title: string;
  domain: ChallengeDomain;
  summary: string;
  district: string;
  block: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  supportingReportCount: number;
  supportingReportIds: string[];
  affectedPopulationEstimate: number;
  severityScore: number;
  validationStatus: ChallengeStatus;
  validatedBy?: {
    name: string;
    role: string;
    department: string;
    timestamp: string;
  };
  requiredExpertise: string[];
  aiMatchingScore: number;
  matchedUniversities: {
    id: string;
    name: string;
    department: string;
    matchScore: number;
    rationale: string;
  }[];
  matchedIndustryPartners: {
    id: string;
    name: string;
    csrFocus: string;
    fundingPotential: string;
    matchScore: number;
  }[];
  activeProjectsCount: number;
  lifecycleStage:
    | 'Validation'
    | 'Team Formation'
    | 'Proposal'
    | 'Prototype'
    | 'Pilot'
    | 'Impact Verification';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  completedDate?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'VERIFIED';
  deliverablesSummary: string;
  verifiedBy?: string;
  evidenceUrl?: string;
  citizenVerificationRate?: number; // e.g. 92%
}

export interface CollaborationProject {
  id: string;
  code: string;
  challengeId: string;
  challengeTitle: string;
  projectTitle: string;
  leadUniversity: string;
  facultyMentor: string;
  studentTeamName: string;
  studentMembers: {
    name: string;
    role: string;
    discipline: string;
  }[];
  industryPartner?: {
    name: string;
    csrPledge: string;
    mentorName: string;
  };
  stage: 'Proposal' | 'Prototyping' | 'Field Pilot' | 'Completed';
  currentMilestoneIndex: number;
  milestones: ProjectMilestone[];
  budgetPledged: string;
  telemetryMetrics?: {
    label: string;
    value: string;
    baseline: string;
    improvement: string;
  }[];
  lastUpdated: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  entityType: 'REPORT' | 'CLUSTER' | 'CHALLENGE' | 'PROJECT_MILESTONE' | 'AI_MODEL';
  entityCode: string;
  actorRole: UserRole;
  actorName: string;
  action: 'AI_INGEST' | 'AI_CLASSIFY' | 'HUMAN_VALIDATE' | 'HUMAN_OVERRIDE' | 'DUPLICATE_MERGE' | 'MERGE_REVERSED' | 'CSR_PLEDGE';
  aiRecommendationSnapshot: string;
  decisionTaken: string;
  overrideJustification?: string;
  hashSignature: string; // SHA-256 tamper-evident representation
}

export interface DistrictFairnessData {
  district: string;
  division: string;
  totalReports: number;
  validatedChallenges: number;
  activeProjects: number;
  resolvedProjects: number;
  avgResolutionDays: number;
  aiOverrideRate: number; // percentage
  disparityStatus: 'EQUITY_OPTIMAL' | 'MODERATE_GAP' | 'HIGH_ATTENTION_NEEDED';
  primaryLanguages: string[];
}
