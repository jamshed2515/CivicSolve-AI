'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import {
  GraduationCap,
  Building2,
  Briefcase,
  Activity,
  CheckCircle2,
  Clock,
  ArrowLeft,
  FileCheck2,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Upload,
  Users,
} from 'lucide-react';

export default function ProjectWorkspacePage() {
  const params = useParams();
  const projectId = (params.id as string) || 'prj-001';

  const { projects, verifyMilestone, currentRole } = useApp();

  const project = projects.find((p) => p.id === projectId) || projects[0];

  const [activeTab, setActiveTab] = useState<'milestones' | 'telemetry' | 'team'>('milestones');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const handleVerify = (milestoneId: string) => {
    verifyMilestone(
      project.id,
      milestoneId,
      'Prof. Dr. A. K. Verma (Faculty Mentor, BIT Mesra)'
    );
    setVerifyingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/challenges"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      {/* Project Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              {project.code}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Stage: {project.stage}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">CSR Grant Pledged:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {project.budgetPledged} ({project.industryPartner?.name})
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {project.projectTitle}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Addressing Societal Challenge: <strong>{project.challengeTitle}</strong>. Multidisciplinary student engineering team in partnership with faculty guides and industry CSR mentors.
        </p>

        {/* Stakeholder Triad Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px]">Academic Lead:</span>
              <strong className="text-slate-900">{project.leadUniversity}</strong>
              <div className="text-slate-500 text-[11px]">Mentor: {project.facultyMentor}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-indigo-700 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px]">Student Innovation Team:</span>
              <strong className="text-slate-900">{project.studentTeamName}</strong>
              <div className="text-slate-500 text-[11px]">{project.studentMembers.length} multidisciplinary students</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-cyan-700 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px]">CSR Sponsor:</span>
              <strong className="text-slate-900">{project.industryPartner?.name}</strong>
              <div className="text-slate-500 text-[11px]">Grant Escrow Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'milestones'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Milestones & Deliverable Verification
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'telemetry'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Live IoT Telemetry & Sensor Metrics
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'team'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Multidisciplinary Team Roster
        </button>
      </div>

      {/* Tab 1: Milestones */}
      {activeTab === 'milestones' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Escrow-Tied Engineering Milestones
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Each milestone requires documented evidence and mentor sign-off before subsequent CSR grant tranches are unlocked.
            </p>
          </div>

          <div className="space-y-4">
            {project.milestones.map((m, idx) => {
              const isCompleted = m.status === 'COMPLETED' || m.status === 'VERIFIED';
              const isCurrent = idx === project.currentMilestoneIndex;

              return (
                <div
                  key={m.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isCompleted
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : isCurrent
                      ? 'border-blue-300 bg-blue-50/20 shadow-sm'
                      : 'border-slate-200 bg-slate-50/40 opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{m.title}</h3>
                        <span className="text-[11px] text-slate-400">Target: {m.targetDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          m.status === 'VERIFIED'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : m.status === 'IN_PROGRESS'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {m.deliverablesSummary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-slate-100 text-xs">
                    <div className="text-[11px] text-slate-500">
                      {m.verifiedBy ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified by: {m.verifiedBy}
                        </span>
                      ) : (
                        <span className="text-slate-400">Awaiting faculty or official inspection</span>
                      )}
                    </div>

                    {!isCompleted && isCurrent && (
                      <button
                        onClick={() => handleVerify(m.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm transition-colors"
                      >
                        Verify & Unlock CSR Tranche
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Live Field IoT Telemetry & Sensor Metrics
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live continuous telemetry transmitting from pilot sensors deployed in Murhu Block.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.telemetryMetrics?.map((met, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <span className="text-xs text-slate-500">{met.label}</span>
                <div className="text-xl font-bold text-slate-900">{met.value}</div>
                <div className="text-[11px] text-slate-400">Baseline: {met.baseline}</div>
                <div className="text-[11px] font-bold text-emerald-600">{met.improvement}</div>
              </div>
            )) || (
              <div className="col-span-4 p-8 text-center text-slate-400 text-xs">
                Sensors calibrating in field. Data will stream directly to dashboard.
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-700" />
              <span>Edge Computing Gateway Active</span>
            </div>
            <p>
              Sensor nodes use solar-powered LoRaWAN gateways transmitting to Jharkhand State Data Centre (JSDC) with cryptographic authentication.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Team Roster */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Student Innovator Team Roster
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Multidisciplinary engineering and science students from {project.leadUniversity}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.studentMembers.map((member, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center mb-2">
                  {member.name[0]}
                </div>
                <div className="font-bold text-slate-900">{member.name}</div>
                <div className="text-blue-700 font-medium">{member.role}</div>
                <div className="text-slate-400 text-[11px]">{member.discipline}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
