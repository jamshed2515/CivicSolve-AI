'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import {
  Scale,
  ShieldCheck,
  RotateCcw,
  UserCheck,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  FileCheck2,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function AuditTrailPage() {
  const { auditLogs } = useApp();

  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesAction = filterAction === 'ALL' || log.action === filterAction;
    const matchesSearch =
      log.entityCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.decisionTaken.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.hashSignature.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesAction && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-blue-100 text-blue-800">
              <Scale className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Trustworthy AI & Immutable Governance Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cryptographic Audit Trail & HITL Accountability
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Every AI prediction, deduplication merge, and Human-in-the-Loop administrative override is cryptographically hashed with SHA-256 for public verifiability and strict institutional accountability.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tamper-Evident Ledger Active</span>
        </span>
      </div>

      {/* Trust Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Logged Actions</div>
          <div className="text-2xl font-extrabold text-blue-900 mt-1">{auditLogs.length} Events</div>
          <div className="text-[11px] text-slate-400 mt-1">100% SHA-256 signed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Human Overrides</div>
          <div className="text-2xl font-extrabold text-amber-700 mt-1">
            {auditLogs.filter((l) => l.action === 'HUMAN_OVERRIDE').length} Recorded
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Full justification logged</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Black-Box Decisions</div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">0 (Zero)</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Explainable by policy</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Public Verifiability</div>
          <div className="text-2xl font-extrabold text-indigo-900 mt-1">DPDP & RTI</div>
          <div className="text-[11px] text-slate-400 mt-1">Right to Explanation compliant</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by entity code, actor name, or hash..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 text-xs">
          <span className="text-slate-500 font-medium">Filter Action:</span>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Actions</option>
            <option value="HUMAN_OVERRIDE">Human-in-the-Loop Override</option>
            <option value="HUMAN_VALIDATE">Human Validation</option>
            <option value="AI_CLASSIFY">AI Classification</option>
            <option value="AI_INGEST">AI Ingest</option>
            <option value="DUPLICATE_MERGE">Semantic Cluster Merge</option>
            <option value="MERGE_REVERSED">Cluster Merge Reversed</option>
          </select>
        </div>
      </div>

      {/* Audit Log Chronological Feed */}
      <div className="space-y-4">
        {filteredLogs.map((entry) => {
          const isOverride = entry.action === 'HUMAN_OVERRIDE';
          const isReversed = entry.action === 'MERGE_REVERSED';

          return (
            <div
              key={entry.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm transition-all space-y-3 ${
                isOverride
                  ? 'border-amber-300 bg-amber-50/20'
                  : isReversed
                  ? 'border-indigo-300 bg-indigo-50/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Top row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      isOverride
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : entry.action === 'HUMAN_VALIDATE'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-blue-100 text-blue-800 border-blue-300'
                    }`}
                  >
                    {entry.action.replace('_', ' ')}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{entry.entityCode}</span>
                  <span className="text-slate-400">({entry.entityType})</span>
                </div>

                <div className="text-[11px] text-slate-400">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>

              {/* Action Details & Decision */}
              <div className="text-xs space-y-1.5">
                <div className="font-semibold text-slate-800">
                  Decision Taken: <span className="font-normal text-slate-700">{entry.decisionTaken}</span>
                </div>

                {entry.aiRecommendationSnapshot && (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    <span className="font-bold text-slate-700">Original AI Recommendation: </span>
                    {entry.aiRecommendationSnapshot}
                  </div>
                )}

                {entry.overrideJustification && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                    <span className="font-bold">Human Justification: </span>
                    {entry.overrideJustification}
                  </div>
                )}
              </div>

              {/* Actor & SHA-256 Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>
                    Actor: <strong>{entry.actorName}</strong> ({entry.actorRole})
                  </span>
                </div>

                <div className="flex items-center gap-1 font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200" title="Tamper-evident cryptographic signature">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>SHA256: {entry.hashSignature}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
