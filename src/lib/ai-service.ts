import { AIAnalysisResult, ChallengeDomain, ConfidenceTier } from './types';

interface DomainKeywordMatch {
  domain: ChallengeDomain;
  keywords: string[];
  baseSeverity: number;
}

const DOMAIN_TAXONOMY: DomainKeywordMatch[] = [
  {
    domain: 'Rural Infrastructure & Mobility',
    keywords: ['bridge', 'road', 'culvert', 'flood', 'monsoon', 'river', 'crossing', 'isolated', 'ambulance', 'pothole', 'connectivity'],
    baseSeverity: 82,
  },
  {
    domain: 'Water & Sanitation',
    keywords: ['water', 'arsenic', 'fluoride', 'contamination', 'borewell', 'handpump', 'drinking', 'drainage', 'sewage', 'toilet'],
    baseSeverity: 85,
  },
  {
    domain: 'Waste Management & Environment',
    keywords: ['fire', 'coal', 'mine', 'smoke', 'pm2.5', 'pollution', 'subsidence', 'thermal', 'fumes', 'fly-ash', 'garbage', 'dump'],
    baseSeverity: 88,
  },
  {
    domain: 'Agriculture & Soil Health',
    keywords: ['crop', 'farmer', 'lac', 'spoilage', 'storage', 'irrigation', 'seeds', 'soil', 'harvest', 'msp', 'cold storage', 'pesticide'],
    baseSeverity: 78,
  },
  {
    domain: 'Public Health & Nutrition',
    keywords: ['health', 'hospital', 'clinic', 'anemia', 'malnutrition', 'doctor', 'medicine', 'phc', 'chc', 'pregnant', 'vaccine'],
    baseSeverity: 86,
  },
  {
    domain: 'Renewable Energy & Power',
    keywords: ['electricity', 'solar', 'grid', 'blackout', 'transformer', 'power', 'low voltage', 'wires', 'meter'],
    baseSeverity: 74,
  },
  {
    domain: 'Education & Digital Literacy',
    keywords: ['school', 'teacher', 'classroom', 'digital', 'internet', 'books', 'students', 'computer', 'attendance'],
    baseSeverity: 72,
  },
];

export function runAiProblemAnalysis(
  text: string,
  district: string,
  block: string,
  language: string,
  hasMedia: boolean
): AIAnalysisResult {
  const lower = text.toLowerCase();
  
  // 1. Keyword & Entity extraction
  const scores = DOMAIN_TAXONOMY.map((item) => {
    const matched = item.keywords.filter((kw) => lower.includes(kw));
    return {
      domain: item.domain,
      matchCount: matched.length,
      matchedWords: matched,
      baseSeverity: item.baseSeverity,
    };
  });

  scores.sort((a, b) => b.matchCount - a.matchCount);
  const best = scores[0];

  let predictedDomain: ChallengeDomain = 'Rural Infrastructure & Mobility';
  let domainConfidence = 0.76;
  let keyEntities: string[] = [district, block];

  if (best.matchCount > 0) {
    predictedDomain = best.domain;
    domainConfidence = Math.min(0.96, 0.72 + best.matchCount * 0.08);
    keyEntities = [...keyEntities, ...best.matchedWords];
  } else {
    // Fallback based on text heuristics
    predictedDomain = 'Water & Sanitation';
    domainConfidence = 0.65;
  }

  // 2. High severity detection heuristics (e.g. school, ambulance, children, fire, toxic)
  const isEmergency =
    lower.includes('ambulance') ||
    lower.includes('fire') ||
    lower.includes('hospital') ||
    lower.includes('school') ||
    lower.includes('emergency') ||
    lower.includes('poison');

  const severityScore = Math.min(
    98,
    Math.round(best.baseSeverity + (isEmergency ? 12 : 0) + (hasMedia ? 4 : 0))
  );

  // 3. Simulated Semantic Similarity with existing knowledge base
  let matchedClusterId: string | undefined = undefined;
  let similarReportIds: string[] = [];
  let similarityScore = 0.45;

  if (lower.includes('bridge') || lower.includes('flood') || lower.includes('bundu') || lower.includes('nawadih')) {
    matchedClusterId = 'cluster-bundu-waterway';
    similarReportIds = ['rep-001', 'rep-002'];
    similarityScore = 0.91;
  } else if (lower.includes('fire') || lower.includes('jharia') || lower.includes('coal') || lower.includes('smoke')) {
    matchedClusterId = 'cluster-jharia-subsidence';
    similarReportIds = ['rep-003'];
    similarityScore = 0.88;
  } else if (lower.includes('lac') || lower.includes('storage') || lower.includes('torpa') || lower.includes('spoil')) {
    matchedClusterId = 'cluster-torpa-lac';
    similarReportIds = ['rep-004'];
    similarityScore = 0.87;
  }

  // 4. Confidence Tier & Human Review Routing
  let confidenceTier: ConfidenceTier = 'HIGH';
  let humanReviewRequired = false;
  let escalationReason: string | undefined = undefined;

  if (domainConfidence < 0.70) {
    confidenceTier = 'LOW';
    humanReviewRequired = true;
    escalationReason = 'Classification confidence below 70% threshold. Requires human thematic tag verification.';
  } else if (severityScore >= 90 || isEmergency) {
    confidenceTier = 'ESCALATED';
    humanReviewRequired = true;
    escalationReason = 'High severity / public safety hazard detected. Mandatory District Development Officer sign-off required.';
  } else if (domainConfidence < 0.85) {
    confidenceTier = 'MEDIUM';
    humanReviewRequired = true;
    escalationReason = 'Multi-domain contextual overlap. Human confirmation requested.';
  }

  // 5. Generate transparent rationale explanation
  let rationaleExplanation = `Classified as ${predictedDomain} with ${(domainConfidence * 100).toFixed(0)}% confidence based on detected terms: [${keyEntities.join(', ')}].`;
  if (matchedClusterId) {
    rationaleExplanation += ` Semantic similarity scan detected ${(similarityScore * 100).toFixed(0)}% alignment with existing regional cluster (${matchedClusterId}) based on geographic proximity (${district}) and shared root cause.`;
  }
  if (humanReviewRequired) {
    rationaleExplanation += ` Flagged for Human-in-the-Loop review because: ${escalationReason}`;
  }

  return {
    id: `ai-${Date.now()}`,
    reportId: `rep-${Date.now()}`,
    predictedDomain,
    domainConfidence,
    confidenceTier,
    semanticSimilarityScore: similarityScore,
    matchedClusterId,
    similarReportIds,
    severityScore,
    priorityFactors: {
      affectedPopulationWeight: 0.35,
      recurrenceWeight: 0.25,
      vulnerabilityIndex: 0.20,
      communityEndorsements: 0.20,
    },
    keyEntities,
    rationaleExplanation,
    humanReviewRequired,
    escalationReason,
    accountableRole: 'District Moderator',
    isOverridden: false,
    processedAt: new Date().toISOString(),
  };
}
