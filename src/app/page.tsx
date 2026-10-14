'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import TrustGovernanceLoop from '@/components/governance/TrustGovernanceLoop';
import ConfidenceMeter from '@/components/ai/ConfidenceMeter';
import {
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Landmark,
  ArrowRight,
  ChevronRight,
  Activity,
  CheckCircle2,
  AlertCircle,
  Scale,
  Lock,
  Layers,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  const { challenges, reports, projects, currentRole, setCurrentRole } = useApp();

  const priorityChallenges = challenges.slice(0, 3);
  const recentReports = reports.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur animate-in fade-in slide-in-from-top-3 duration-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Smart India Hackathon • SIH26043 • Trustworthy AI in Public Governance</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Grassroots Voices</span> into Validated Societal Solutions
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              An explainable, human-governed AI ecosystem that aggregates fragmented citizen challenges across Jharkhand, matches them with university R&D laboratories, and unlocks industry CSR capital for verifiable public impact.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Report Local Problem (Voice / Text)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/challenges"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm backdrop-blur transition-all hover:text-white"
              >
                <span>Explore Challenge Marketplace</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-emerald-400 font-medium text-sm transition-all"
              >
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Verify AI Audit Trail</span>
              </Link>
            </div>

            {/* Core Trust Pillars Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 w-full max-w-4xl text-left">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 mb-1">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Privacy First (DPDP)</span>
                </div>
                <p className="text-[11px] text-slate-400">Automatic PII masking & granular citizen consent preservation.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Explainable AI (XAI)</span>
                </div>
                <p className="text-[11px] text-slate-400">Clear attribution factors, semantic similarity score, and reasoning.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Human-in-the-Loop</span>
                </div>
                <p className="text-[11px] text-slate-400">No autonomous sanctioning; administrative officer override rights.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Algorithmic Equity</span>
                </div>
                <p className="text-[11px] text-slate-400">Active disparity audit across remote tribal & rural blocks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Counters Bar */}
      <section className="bg-white border-y border-slate-200 py-6 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center divide-x divide-slate-100">
          <div className="px-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-blue-900">1,248+</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Grassroots Ingestions</div>
          </div>
          <div className="px-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-indigo-900">94.8%</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">AI Clustering Match</div>
          </div>
          <div className="px-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">38</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Validated Challenges</div>
          </div>
          <div className="px-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-teal-800">14</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">Partner Universities</div>
          </div>
          <div className="px-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-emerald-700">₹4.85 Cr</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">CSR Capital Pledged</div>
          </div>
          <div className="px-3">
            <div className="text-2xl lg:text-3xl font-extrabold text-cyan-800">100%</div>
            <div className="text-xs font-medium text-slate-500 mt-0.5">SHA-256 Audit Trail</div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Interactive Governance Loop Showcase */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              The Closed-Loop Trustworthy AI Framework
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every citizen submission journeys through a multi-tier governance loop ensuring full explainability, privacy preservation, accountable human oversight, and verifiable community feedback.
            </p>
          </div>
          <TrustGovernanceLoop currentStep={2} />
        </div>

        {/* Stakeholder Role Quick-Switch Navigator */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">Stakeholder Experience</span>
                <h3 className="text-xl sm:text-2xl font-bold mt-1">Multi-Sided Governance Portal</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Switch personas to experience how CivicSolve AI serves each pillar of society:
                </p>
              </div>
              <div className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 self-start md:self-auto">
                Current Active: <span className="font-bold text-blue-300 capitalize">{currentRole}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <button
                onClick={() => setCurrentRole('citizen')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  currentRole === 'citizen'
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm">Citizen / Village</div>
                <p className="text-[11px] text-slate-400 mt-1">Submit issues via voice/text in Hindi or Santali, track resolution.</p>
                <span className="inline-block mt-3 text-[10px] text-blue-400 font-semibold">Launch Citizen Hub →</span>
              </button>

              <button
                onClick={() => setCurrentRole('university')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  currentRole === 'university'
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm">University Lab</div>
                <p className="text-[11px] text-slate-400 mt-1">Browse matched societal problems aligned to academic departments.</p>
                <span className="inline-block mt-3 text-[10px] text-blue-400 font-semibold">Launch Academic Hub →</span>
              </button>

              <button
                onClick={() => setCurrentRole('student')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  currentRole === 'student'
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm">Student Innovator</div>
                <p className="text-[11px] text-slate-400 mt-1">Build multidisciplinary hackathon teams, manage prototyping tasks.</p>
                <span className="inline-block mt-3 text-[10px] text-blue-400 font-semibold">View Workspace →</span>
              </button>

              <button
                onClick={() => setCurrentRole('industry')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  currentRole === 'industry'
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm">Industry CSR</div>
                <p className="text-[11px] text-slate-400 mt-1">Filter high-impact challenges matching corporate ESG & SDG goals.</p>
                <span className="inline-block mt-3 text-[10px] text-blue-400 font-semibold">Launch CSR Portal →</span>
              </button>

              <button
                onClick={() => setCurrentRole('government')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  currentRole === 'government'
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Landmark className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm">District Magistrate</div>
                <p className="text-[11px] text-slate-400 mt-1">Audit district algorithmic fairness, sign-off on validated projects.</p>
                <span className="inline-block mt-3 text-[10px] text-blue-400 font-semibold">Launch Gov Console →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Challenges Marketplace Preview */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-100 text-blue-800">
                  <Layers className="w-4 h-4" />
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Active High-Impact Societal Challenges
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Synthesized by AI from hundreds of grassroots reports, vetted by district authorities, and open for university adoption.
              </p>
            </div>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
            >
              <span>View All 38 Challenges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {priorityChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {challenge.domain}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {challenge.code}
                    </span>
                  </div>

                  <Link href={`/challenges/${challenge.id}`}>
                    <h3 className="font-bold text-base text-slate-900 hover:text-blue-700 transition-colors line-clamp-2">
                      {challenge.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {challenge.summary}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {challenge.district}, {challenge.block}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {challenge.affectedPopulationEstimate.toLocaleString()} affected
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Grassroots Reports Merged:</span>
                    <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      {challenge.supportingReportCount} Ingestions
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">AI Severity Rating:</span>
                    <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                      {challenge.severityScore}/100 Critical
                    </span>
                  </div>

                  <Link
                    href={`/challenges/${challenge.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 hover:bg-blue-900 text-white text-xs font-medium transition-colors"
                  >
                    <span>Inspect XAI Details & Adopt</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Ingestion Stream & District Fairness Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Live Citizen Ingestions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-base text-slate-900">Live Grassroots Ingestion Stream</h3>
              </div>
              <Link href="/citizen" className="text-xs font-semibold text-blue-700 hover:underline">
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-3">
              {recentReports.map((report) => (
                <div key={report.id} className="py-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{report.code}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {report.submissionChannel}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {report.district} • {report.block}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    &ldquo;{report.rawText}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <Lock className="w-3 h-3" />
                      Masked: {report.citizenNameMasked}
                    </span>
                    <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Category: {report.categorySuggested}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100">
              <Link
                href="/submit"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs transition-colors"
              >
                <span>Submit Your Local Citizen Problem Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: District Fairness & Algorithmic Parity */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-bold text-base text-slate-900">District Algorithmic Fairness Index</h3>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Fairness Monitored
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Trustworthy AI guarantees equal opportunity of societal attention regardless of linguistic background or geographic remoteness. We continuously monitor demographic parity across all 24 districts of Jharkhand.
              </p>

              <div className="space-y-3 mt-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Khunti District (Tribal Belt)</div>
                    <div className="text-[11px] text-slate-500">184 Reports • Mundari/Santali Dialects</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      Equity Optimal (1.02)
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">3 Active University Pilots</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Sahibganj District (Santhal Pargana)</div>
                    <div className="text-[11px] text-slate-500">142 Reports • Arsenic & Water Issues</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      Equity Optimal (0.98)
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">₹85L CSR Pledged</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Dhanbad District (Mining Corridor)</div>
                    <div className="text-[11px] text-slate-500">230 Reports • Coal Fire & Pollution</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      Equity Optimal (1.04)
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">IIT ISM R&D Active</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                href="/government"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs transition-colors"
              >
                <span>Open District Fairness Heatmap & Sign-off Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
