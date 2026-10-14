'use client';

import React, { useState } from 'react';
import { AIAnalysisResult } from '@/lib/types';
import ConfidenceMeter from './ConfidenceMeter';
import HumanReviewModal from '../governance/HumanReviewModal';
import {
  Sparkles,
  HelpCircle,
  FileCheck2,
  AlertTriangle,
  UserCheck,
  RotateCcw,
  Info,
  Scale,
} from 'lucide-react';

interface AiExplanationPanelProps {
  analysis: AIAnalysisResult;
  reportCode?: string;
  reportText?: string;
  className?: string;
  allowOverride?: boolean;
}

export default function AiExplanationPanel({
  analysis,
  reportCode = 'REP-JH-2026-X',
  reportText,
  className = '',
  allowOverride = true,
}: AiExplanationPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`p-5 rounded-2xl bg-white border border-slate-200 shadow-sm ${className}`}>
      {/* Header with XAI Badge */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Explainable AI (XAI) Recommendation</h3>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Non-Autonomous Support
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Transparent Multi-Factor Reasoning & Evidence Attribution
            </p>
          </div>
        </div>

        {analysis.isOverridden ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            Human Overridden
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            AI Recommended
          </span>
        )}
      </div>

      {/* Override Notice if present */}
      {analysis.isOverridden && analysis.overrideNote && (
        <div className="mt-3 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Human Override Justification: </span>
            <span>{analysis.overrideNote}</span>
          </div>
        </div>
      )}

      {/* Section 1: What the AI Recommends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Recommended Domain
          </span>
          <p className="text-sm font-bold text-slate-900">{analysis.predictedDomain}</p>
          <p className="text-[11px] text-slate-500">
            Assigned to regional multidisciplinary intake pool
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Severity / Priority Score
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded">
              {analysis.severityScore} / 100
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
            <div
              className={`h-full rounded-full ${
                analysis.severityScore >= 85
                  ? 'bg-rose-500'
                  : analysis.severityScore >= 70
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${analysis.severityScore}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500">
            {analysis.severityScore >= 85 ? 'High Escalation Needed' : 'Standard Civic Pipeline'}
          </p>
        </div>
      </div>

      {/* Section 2: Confidence Meter */}
      <div className="my-4 pt-3 border-t border-slate-100">
        <ConfidenceMeter confidence={analysis.domainConfidence} tier={analysis.confidenceTier} />
      </div>

      {/* Section 3: Why it made the recommendation & Factors */}
      <div className="my-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Factor Breakdown & Weightings</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Affected Population</span>
            <span className="font-bold text-slate-800">35% weight</span>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Recurrence Pattern</span>
            <span className="font-bold text-slate-800">25% weight</span>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: '70%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Vulnerability Index</span>
            <span className="font-bold text-slate-800">20% weight</span>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Community Endorsement</span>
            <span className="font-bold text-slate-800">20% weight</span>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>

        {/* Contributing Evidence / Keywords */}
        <div>
          <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
            Key Extracted Terms & Semantic Entities:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {analysis.keyEntities.map((ent, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-medium"
              >
                {ent}
              </span>
            ))}
          </div>
        </div>

        {/* Natural Language Rationale Explanation */}
        <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900 mb-1">Algorithmic Rationale:</p>
          <p>{analysis.rationaleExplanation}</p>
        </div>
      </div>

      {/* Section 4: Governance & Accountability Footnote */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-700">
            <UserCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>
              Accountable Human Authority:{' '}
              <strong className="text-slate-900">{analysis.accountableRole}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Scale className="w-3 h-3 text-slate-400" />
            <span>Human Review Required: {analysis.humanReviewRequired ? 'Yes (Mandatory)' : 'No (Automated Pool)'}</span>
            <span>•</span>
            <span>Can be Overridden: Yes</span>
          </div>
        </div>

        {allowOverride && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Contest / Override AI</span>
          </button>
        )}
      </div>

      {/* Human Review Modal */}
      <HumanReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reportId={analysis.reportId}
        reportCode={reportCode}
        currentDomain={analysis.predictedDomain}
        currentSeverity={analysis.severityScore}
      />
    </div>
  );
}
