'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  Lock,
  ArrowRight,
  PlusCircle,
  FileText,
  AlertTriangle,
} from 'lucide-react';

export default function CitizenHubPage() {
  const { reports, challenges, language } = useApp();

  const [searchCode, setSearchCode] = useState('');
  const [activeTab, setActiveTab] = useState<'my-reports' | 'panchayat-feed'>('my-reports');
  const [endorsedIds, setEndorsedIds] = useState<string[]>([]);

  const toggleEndorse = (id: string) => {
    if (endorsedIds.includes(id)) {
      setEndorsedIds(endorsedIds.filter((x) => x !== id));
    } else {
      setEndorsedIds([...endorsedIds, id]);
    }
  };

  const filteredReports = searchCode.trim()
    ? reports.filter(
        (r) =>
          r.code.toLowerCase().includes(searchCode.toLowerCase()) ||
          r.district.toLowerCase().includes(searchCode.toLowerCase()) ||
          r.block.toLowerCase().includes(searchCode.toLowerCase())
      )
    : reports;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-emerald-100 text-emerald-800">
              <Users className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Citizen & Community Empowerment Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Track Community Reports & Local Impact
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            See the exact journey of your submitted challenges. Verify how university engineering teams and government administrators are addressing your village problems.
          </p>
        </div>

        <Link
          href="/submit"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Problem</span>
        </Link>
      </div>

      {/* Tracking Search & Status Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Track by Report ID (e.g. REP-JH-2026-1001) or Block Name..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('my-reports')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'my-reports'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              My District Reports ({reports.length})
            </button>
            <button
              onClick={() => setActiveTab('panchayat-feed')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'panchayat-feed'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Panchayat Live Stream
            </button>
          </div>
        </div>
      </div>

      {/* Reports List with Progress Stepper */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const isEndorsed = endorsedIds.includes(report.id);
          const matchedChallenge = challenges.find(
            (c) => c.id === report.clusterId || c.supportingReportIds.includes(report.id)
          );

          return (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-blue-200 transition-all space-y-4"
            >
              {/* Top Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    {report.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {report.district} District • {report.block} Block
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[11px] text-slate-400">
                    Channel: <strong>{report.submissionChannel}</strong>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Date: {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Problem Content */}
              <div>
                <p className="text-sm text-slate-800 leading-relaxed font-sans font-medium">
                  &ldquo;{report.rawText}&rdquo;
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {report.categorySuggested}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 text-[11px]">
                    <Lock className="w-3 h-3" />
                    DPDP Identity Masked ({report.citizenNameMasked})
                  </span>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold uppercase text-slate-400 mb-3 tracking-wider">
                  Citizen Governance Journey
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>1. Ingested & PII Masked</span>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>2. AI Categorized</span>
                  </div>

                  <div className={`flex items-center gap-2 ${
                    matchedChallenge?.validatedBy ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'
                  }`}>
                    {matchedChallenge?.validatedBy ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    ) : (
                      <Clock className="w-4 h-4 shrink-0 text-amber-500 animate-spin" />
                    )}
                    <span>3. Administrative Review</span>
                  </div>

                  <div className={`flex items-center gap-2 ${
                    matchedChallenge?.activeProjectsCount ? 'text-blue-700 font-semibold' : 'text-slate-400'
                  }`}>
                    {matchedChallenge?.activeProjectsCount ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                    ) : (
                      <Clock className="w-4 h-4 shrink-0" />
                    )}
                    <span>4. University Prototyping</span>
                  </div>
                </div>
              </div>

              {/* Action and Endorsement Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  onClick={() => toggleEndorse(report.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isEndorsed
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isEndorsed ? 'text-blue-700 fill-blue-700' : 'text-slate-400'}`} />
                  <span>I am affected too ({isEndorsed ? 24 : 23} endorsements)</span>
                </button>

                {matchedChallenge && (
                  <Link
                    href={`/challenges/${matchedChallenge.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    <span>View Clustered Societal Challenge ({matchedChallenge.code})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
