'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import AiExplanationPanel from '@/components/ai/AiExplanationPanel';
import HumanReviewModal from '@/components/governance/HumanReviewModal';
import {
  ShieldCheck,
  MapPin,
  Users,
  Building2,
  Briefcase,
  Layers,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Lock,
  RotateCcw,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Split,
} from 'lucide-react';

export default function ChallengeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;

  const { challenges, reports, aiAnalyses, currentRole, validateChallengeStatus, reverseDuplicateMerge } = useApp();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reverseMergeId, setReverseMergeId] = useState<string | null>(null);

  const challenge = challenges.find((c) => c.id === challengeId) || challenges[0];

  // Supporting reports for this challenge
  const clusterReports = reports.filter(
    (r) => r.clusterId === challenge.id || challenge.supportingReportIds.includes(r.id)
  );

  // Pick an AI analysis for this challenge
  const representativeReportId = challenge.supportingReportIds[0] || 'rep-101';
  const analysis = aiAnalyses[representativeReportId] || Object.values(aiAnalyses)[0];

  const handleValidateOfficial = () => {
    validateChallengeStatus(
      challenge.id,
      'Shri Sunil Kumar, IAS (Secretary, Higher & Technical Education)',
      'Government Official',
      'Govt. of Jharkhand'
    );
  };

  const handleReverseMerge = (reportId: string) => {
    reverseDuplicateMerge(
      reportId,
      challenge.id,
      'Human Review determined this report represents an independent geological issue requiring isolated handling.'
    );
    setReverseMergeId(null);
  };

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-500">
        <h2 className="text-xl font-bold">Challenge Not Found</h2>
        <Link href="/challenges" className="text-blue-700 text-xs font-semibold mt-2 inline-block">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/challenges"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Challenge Marketplace</span>
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {challenge.domain}
            </span>
            <span className="font-mono text-xs font-bold text-slate-500">
              {challenge.code}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {challenge.validatedBy ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Validated Societal Challenge
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Under Human Review
              </span>
            )}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {challenge.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {challenge.summary}
        </p>

        {/* Location & Population Metadata */}
        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-500 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>District: <strong>{challenge.district}</strong> ({challenge.block} Block)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-400" />
            <span>Estimated Affected Citizens: <strong className="text-slate-800">{challenge.affectedPopulationEstimate.toLocaleString()}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>AI Severity Rating: <strong className="text-rose-700">{challenge.severityScore}/100 Critical</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Lifecycle: <strong className="text-blue-700">{challenge.lifecycleStage}</strong></span>
          </div>
        </div>

        {/* Official Sign-Off Action Banner */}
        {challenge.validatedBy ? (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>
                Formally sanctioned by <strong>{challenge.validatedBy.name}</strong> ({challenge.validatedBy.role})
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">
              Timestamp: {new Date(challenge.validatedBy.timestamp).toLocaleDateString()}
            </span>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-600">
              This synthesized challenge is awaiting administrative sign-off before official university R&D funding disbursement.
            </div>
            <button
              onClick={handleValidateOfficial}
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-sm transition-colors shrink-0"
            >
              Sign-Off as District Authority
            </button>
          </div>
        )}
      </div>

      {/* Two Column Layout: Explainable AI vs Academic/CSR Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: XAI Inspection & Human-In-The-Loop */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Explainable AI Decision Card */}
          <AiExplanationPanel
            analysis={analysis}
            reportCode={challenge.code}
            reportText={challenge.summary}
            allowOverride={true}
          />

          {/* Merged Citizen Reports Cluster */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-700" />
                <h3 className="font-bold text-sm text-slate-900">
                  Semantic Duplicate & Cluster Ingestions ({clusterReports.length})
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                pgvector Deduplicated
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              These grassroots citizen reports from <strong>{challenge.block} Block</strong> were semantically clustered into this unified challenge. To guarantee fairness, any incorrectly grouped report can be reversed through Human-in-the-Loop review.
            </p>

            <div className="space-y-3">
              {clusterReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-colors space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between text-slate-700 font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-blue-800">{rep.code}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        {rep.submissionChannel}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(rep.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-slate-600 text-xs italic">
                    &ldquo;{rep.rawText}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <Lock className="w-3 h-3" /> PII Masked: {rep.citizenNameMasked}
                    </span>
                    <button
                      onClick={() => handleReverseMerge(rep.id)}
                      className="text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 hover:underline"
                      title="Separate this report if clustered incorrectly"
                    >
                      <Split className="w-3 h-3" />
                      <span>Reverse Cluster Merge</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Matched Universities, CSR Sponsors & Workspace Launch */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Matched Universities Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-700" />
                <h3 className="font-bold text-sm text-slate-900">
                  AI Matched Academic Laboratories
                </h3>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Ranked by Competency
              </span>
            </div>

            <div className="space-y-3">
              {challenge.matchedUniversities.map((uni) => (
                <div
                  key={uni.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{uni.name}</span>
                    <span className="text-blue-700 font-mono text-[11px] font-bold bg-blue-100/60 px-2 py-0.5 rounded">
                      {Math.round(uni.matchScore * 100)}% Match
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Department: {uni.department}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    <strong>AI Rationale:</strong> {uni.rationale}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/university"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors"
            >
              <span>Adopt as Faculty Mentor or Student Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Industry CSR Sponsorship Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-700" />
                <h3 className="font-bold text-sm text-slate-900">
                  Corporate CSR Capital Matching
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                ESG Aligned
              </span>
            </div>

            {challenge.matchedIndustryPartners.map((partner) => (
              <div
                key={partner.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{partner.name}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {partner.fundingPotential} Pledged
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  <strong>CSR Priority:</strong> {partner.csrFocus}
                </p>
                <div className="text-[10px] text-slate-400">
                  Milestone disbursements tied to verifiable community testing.
                </div>
              </div>
            ))}

            <Link
              href="/industry"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
            >
              <span>Commit CSR Grant Funding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Active Prototyping Workspace Card */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-blue-300">
                Multi-Stakeholder Workspace
              </span>
              <span className="text-[10px] bg-blue-800 text-blue-200 px-2 py-0.5 rounded">
                Live Prototype
              </span>
            </div>

            <h3 className="font-bold text-base">
              Prototyping & Pilot Execution Hub
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Track real-time engineering milestones, IoT sensor telemetry from the field, and citizen satisfaction ratings for this societal challenge.
            </p>

            <Link
              href="/workspace/prj-001"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs shadow-md transition-colors"
            >
              <span>Open Collaborative Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

      {/* Human Review Override Modal */}
      <HumanReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reportId={representativeReportId}
        reportCode={challenge.code}
        currentDomain={challenge.domain}
        currentSeverity={challenge.severityScore}
      />
    </div>
  );
}
