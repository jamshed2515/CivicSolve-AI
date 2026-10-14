'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import {
  Landmark,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Users,
  Building2,
  Briefcase,
  FileCheck2,
  SlidersHorizontal,
} from 'lucide-react';

export default function GovernmentFairnessPage() {
  const { fairnessData, challenges, validateChallengeStatus } = useApp();

  const [selectedDivision, setSelectedDivision] = useState<string>('ALL');
  const [signedChallenges, setSignedChallenges] = useState<string[]>([]);

  const divisions = Array.from(new Set(fairnessData.map((d) => d.division)));

  const filteredDistricts =
    selectedDivision === 'ALL'
      ? fairnessData
      : fairnessData.filter((d) => d.division === selectedDivision);

  const handleAdminSignOff = (challengeId: string) => {
    validateChallengeStatus(
      challengeId,
      'Shri Sunil Kumar, IAS (Secretary, Higher & Technical Education)',
      'Government Official',
      'Govt. of Jharkhand'
    );
    setSignedChallenges([...signedChallenges, challengeId]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-amber-100 text-amber-800">
              <Landmark className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              State Governance & Algorithmic Fairness Observatory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            District Demographic Parity & Official Sign-Off
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Continuous auditing of AI resource allocation across Jharkhand. Prevents urban bias by guaranteeing tribal and aspirational districts receive equitable research, academic talent, and CSR capital.
          </p>
        </div>

        {/* Division Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm text-xs self-start md:self-auto">
          <span className="text-slate-500 font-medium">Division:</span>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="font-bold text-slate-800 bg-transparent focus:outline-none"
          >
            <option value="ALL">All Divisions</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Algorithmic Fairness Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">State Disparity Index</div>
          <div className="text-2xl font-extrabold text-emerald-800 mt-1">1.02 (Optimal)</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Within 0.95 - 1.05 ethical threshold</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Tribal Block Attention Rate</div>
          <div className="text-2xl font-extrabold text-blue-900 mt-1">96.4%</div>
          <div className="text-[11px] text-slate-400 mt-1">Mundari, Ho & Santali intake</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Human-in-the-Loop Override Rate</div>
          <div className="text-2xl font-extrabold text-indigo-900 mt-1">4.2%</div>
          <div className="text-[11px] text-slate-400 mt-1">Low false-positive classification</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Average Resolution Speed</div>
          <div className="text-2xl font-extrabold text-teal-800 mt-1">36 Days</div>
          <div className="text-[11px] text-teal-600 font-semibold mt-1">From intake to pilot test</div>
        </div>
      </div>

      {/* District Fairness Observatory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              District Algorithmic Equity & Ingestion Distribution
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative telemetry verifying that remote districts receive proportional attention compared to state capitals.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            DPDP & Ethical AI Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-y border-slate-200">
              <tr>
                <th className="px-6 py-3 font-bold">District & Division</th>
                <th className="px-4 py-3 font-bold">Total Grassroots Ingestions</th>
                <th className="px-4 py-3 font-bold">Validated Challenges</th>
                <th className="px-4 py-3 font-bold">Active Pilots</th>
                <th className="px-4 py-3 font-bold">Avg. Resolution</th>
                <th className="px-4 py-3 font-bold">HITL Override %</th>
                <th className="px-6 py-3 font-bold">Algorithmic Equity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDistricts.map((d) => (
                <tr key={d.district} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{d.district}</div>
                    <div className="text-[11px] text-slate-400">{d.division} Division</div>
                  </td>

                  <td className="px-4 py-4 font-mono font-semibold text-slate-800">
                    {d.totalReports}
                  </td>

                  <td className="px-4 py-4 font-semibold text-blue-800">
                    {d.validatedChallenges}
                  </td>

                  <td className="px-4 py-4 font-semibold text-indigo-700">
                    {d.activeProjects} Active
                  </td>

                  <td className="px-4 py-4 text-slate-700">
                    {d.avgResolutionDays} Days
                  </td>

                  <td className="px-4 py-4 font-mono text-slate-700">
                    {d.aiOverrideRate}%
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        d.disparityStatus === 'EQUITY_OPTIMAL'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : d.disparityStatus === 'MODERATE_GAP'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {d.disparityStatus.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Sign-Off Console for Awaiting Challenges */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Pending Administrative Sign-Offs (Human-in-the-Loop)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These challenges have been clustered by AI with high confidence, but state regulation mandates official authorization before granting university equipment funding.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            Official Approval Queue
          </span>
        </div>

        <div className="space-y-3">
          {challenges.map((c) => {
            const isSigned = c.validatedBy || signedChallenges.includes(c.id);

            return (
              <div
                key={c.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-800">{c.code}</span>
                    <span className="font-semibold text-slate-800">{c.title}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] line-clamp-1">{c.summary}</p>
                  <div className="text-[11px] text-slate-400">
                    District: <strong>{c.district}</strong> • Affected: <strong>{c.affectedPopulationEstimate.toLocaleString()}</strong> • Severity: <strong>{c.severityScore}/100</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isSigned ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Sanctioned by State Authority
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAdminSignOff(c.id)}
                      className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold transition-colors shadow-sm"
                    >
                      Authorize & Sanction R&D
                    </button>
                  )}

                  <Link
                    href={`/challenges/${c.id}`}
                    className="text-slate-600 hover:text-blue-700 font-semibold"
                  >
                    Inspect XAI →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
