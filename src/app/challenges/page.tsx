'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { ChallengeDomain, ChallengeStatus } from '@/lib/types';
import {
  Layers,
  Search,
  Filter,
  MapPin,
  Users,
  Building2,
  Briefcase,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  Activity,
  AlertCircle,
} from 'lucide-react';

const ALL_DOMAINS: ChallengeDomain[] = [
  'Rural Infrastructure & Mobility',
  'Water & Sanitation',
  'Waste Management & Environment',
  'Agriculture & Soil Health',
  'Public Health & Nutrition',
  'Renewable Energy & Power',
  'Education & Digital Literacy',
];

export default function ChallengesPage() {
  const { challenges } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'severity' | 'reports' | 'population'>('severity');

  // Extract unique districts
  const districts = Array.from(new Set(challenges.map((c) => c.district)));

  // Filtered & Sorted challenges
  const filtered = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = selectedDomain === 'ALL' || c.domain === selectedDomain;
    const matchesDistrict = selectedDistrict === 'ALL' || c.district === selectedDistrict;

    return matchesSearch && matchesDomain && matchesDistrict;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'severity') return b.severityScore - a.severityScore;
    if (sortBy === 'reports') return b.supportingReportCount - a.supportingReportCount;
    if (sortBy === 'population') return b.affectedPopulationEstimate - a.affectedPopulationEstimate;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-blue-100 text-blue-800">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Grassroots Innovation Repository
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Societal Challenge Marketplace
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Clustered and validated societal challenges across Jharkhand. Academic faculties, student teams, and CSR partners can adopt challenges to engineer pilot solutions.
          </p>
        </div>

        <Link
          href="/submit"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-all self-start md:self-auto"
        >
          <span>Report New Challenge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search challenges by title, district, code, or problem keyword..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 text-xs">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="severity">Highest Severity Rating</option>
              <option value="reports">Most Grassroots Reports</option>
              <option value="population">Largest Affected Population</option>
            </select>
          </div>
        </div>

        {/* Domain and District Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Domain:
          </span>
          <button
            onClick={() => setSelectedDomain('ALL')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              selectedDomain === 'ALL'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Domains ({challenges.length})
          </button>
          {ALL_DOMAINS.map((domain) => {
            const count = challenges.filter((c) => c.domain === domain).length;
            if (count === 0) return null;
            return (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  selectedDomain === domain
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {domain} ({count})
              </button>
            );
          })}

          <div className="h-4 w-px bg-slate-200 mx-2 hidden lg:block" />

          {/* District Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> District:
            </span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="ALL">All Districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-700 text-sm">No Challenges Matched</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting your search query or domain filter.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDomain('ALL');
              setSelectedDistrict('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header & Badge */}
              <div className="p-6 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {challenge.domain}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {challenge.code}
                  </span>
                </div>

                <Link href={`/challenges/${challenge.id}`}>
                  <h3 className="text-base font-bold text-slate-900 hover:text-blue-700 transition-colors line-clamp-2">
                    {challenge.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {challenge.summary}
                </p>

                {/* Geo and Population Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {challenge.district}, {challenge.block}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {challenge.affectedPopulationEstimate.toLocaleString()} affected
                  </span>
                </div>

                {/* AI Clustered Reports Counter & Severity Bar */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Supporting Grassroots Ingestions:</span>
                    <span className="font-bold text-blue-900 bg-blue-100/60 px-2 py-0.5 rounded text-[11px]">
                      {challenge.supportingReportCount} Merged Reports
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">AI Priority & Severity:</span>
                    <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                      {challenge.severityScore}/100 Critical
                    </span>
                  </div>
                </div>

                {/* Institutional Matches Preview */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">
                      Matched: <strong>{challenge.matchedUniversities[0]?.name || 'BIT Mesra'}</strong>
                    </span>
                  </div>
                  {challenge.matchedIndustryPartners.length > 0 && (
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span className="truncate">
                        CSR Sponsor: <strong>{challenge.matchedIndustryPartners[0]?.name}</strong> ({challenge.matchedIndustryPartners[0]?.fundingPotential})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold text-slate-500">
                  Stage: <strong className="text-blue-700">{challenge.lifecycleStage}</strong>
                </span>

                <Link
                  href={`/challenges/${challenge.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <span>Inspect Challenge</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
