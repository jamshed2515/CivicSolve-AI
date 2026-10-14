'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import {
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  FileText,
  Search,
  Filter,
  Layers,
  Award,
} from 'lucide-react';

const UNIVERSITIES_LIST = [
  'Birla Institute of Technology (BIT) Mesra',
  'IIT (ISM) Dhanbad',
  'National Institute of Technology (NIT) Jamshedpur',
  'Birsa Agricultural University (BAU) Ranchi',
  'Ranchi University',
];

export default function UniversityWorkspacePage() {
  const { challenges, projects } = useApp();

  const [selectedUni, setSelectedUni] = useState(UNIVERSITIES_LIST[0]);
  const [adoptingChallengeId, setAdoptingChallengeId] = useState<string | null>(null);
  const [adoptedList, setAdoptedList] = useState<string[]>(['ch-jh-001']);

  const handleAdopt = (id: string) => {
    setAdoptedList([...adoptedList, id]);
    setAdoptingChallengeId(null);
  };

  // Recomended challenges for selected university
  const matchedChallenges = challenges.filter((c) =>
    c.matchedUniversities.some((u) => u.name.includes('BIT') || u.name.includes('IIT') || u.name.includes('NIT'))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-blue-100 text-blue-800">
              <Building2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Academic & Higher Education Collaborative Innovation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            University Innovation Workspace
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Adopt validated grassroots challenges for Student Capstone Projects, Smart India Hackathon prototyping, and funded faculty research with CSR matching.
          </p>
        </div>

        {/* University Selector */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm text-xs self-start md:self-auto">
          <span className="text-slate-500 font-medium">Institution:</span>
          <select
            value={selectedUni}
            onChange={(e) => setSelectedUni(e.target.value)}
            className="font-bold text-slate-800 bg-transparent focus:outline-none"
          >
            {UNIVERSITIES_LIST.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* University Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Active Capstone Projects</div>
          <div className="text-2xl font-extrabold text-blue-900 mt-1">12 Teams</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 4 new this semester</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">CSR R&D Grant Pledged</div>
          <div className="text-2xl font-extrabold text-emerald-800 mt-1">₹1.45 Cr</div>
          <div className="text-[11px] text-slate-400 mt-1">Tied to milestone verification</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Faculty Mentors Engaged</div>
          <div className="text-2xl font-extrabold text-indigo-900 mt-1">18 Professors</div>
          <div className="text-[11px] text-slate-400 mt-1">Civil, Environmental, Bio-Tech</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Field Deployed Pilots</div>
          <div className="text-2xl font-extrabold text-teal-800 mt-1">5 Verified</div>
          <div className="text-[11px] text-teal-600 font-semibold mt-1">94% Citizen Approval</div>
        </div>
      </div>

      {/* Recommended Societal Challenges for this University */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              AI-Matched Societal Challenges for {selectedUni.split(' ')[0]}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Sorted by Departmental Competency Match
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedChallenges.map((challenge) => {
            const isAdopted = adoptedList.includes(challenge.id);
            const uniMatch = challenge.matchedUniversities[0];

            return (
              <div
                key={challenge.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {challenge.domain}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {challenge.code}
                    </span>
                  </div>

                  <Link href={`/challenges/${challenge.id}`}>
                    <h3 className="font-bold text-base text-slate-900 hover:text-blue-700 transition-colors line-clamp-2">
                      {challenge.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {challenge.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Department Fit:</span>
                      <span className="text-blue-700">{uniMatch?.department || 'Civil Engineering'}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>AI Competency Match:</span>
                      <span className="font-mono font-bold text-emerald-700">
                        {Math.round((uniMatch?.matchScore || 0.92) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>CSR Funding Matched:</span>
                      <span className="font-bold text-slate-800">
                        {challenge.matchedIndustryPartners[0]?.fundingPotential || '₹25,00,000'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  {isAdopted ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Adopted by BIT Mesra Team
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAdopt(challenge.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-sm transition-colors"
                    >
                      Adopt Challenge
                    </button>
                  )}

                  <Link
                    href={`/challenges/${challenge.id}`}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Student Prototyping Projects */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Active Student Innovation Projects ({projects.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Multidisciplinary engineering teams working under faculty supervision on field prototypes.
            </p>
          </div>
          <Link
            href="/workspace/prj-001"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
          >
            Launch Project Workspace
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((prj) => (
            <div
              key={prj.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-blue-800">{prj.code}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  Stage: {prj.stage}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900">{prj.projectTitle}</h3>

              <div className="text-xs text-slate-600 space-y-1">
                <div>Lead Institution: <strong>{prj.leadUniversity}</strong></div>
                <div>Faculty Mentor: <strong>{prj.facultyMentor}</strong></div>
                <div>Team: <strong>{prj.studentTeamName}</strong> ({prj.studentMembers.length} members)</div>
                <div>CSR Partner: <strong>{prj.industryPartner?.name}</strong> ({prj.budgetPledged})</div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Milestone {prj.currentMilestoneIndex + 1} of {prj.milestones.length} Active
                </span>
                <Link
                  href={`/workspace/${prj.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                >
                  <span>Open Collaboration Workspace</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
