'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import {
  Briefcase,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  FileText,
  DollarSign,
  ShieldCheck,
  Building2,
  Users,
  Search,
} from 'lucide-react';

const CSR_PARTNERS = [
  { name: 'Tata Steel Rural Development Society (TSRDS)', budget: '₹1.80 Cr', pledged: '₹75 Lakh', focus: 'Water & Rural Bridges' },
  { name: 'Coal India Limited (CIL CSR Foundation)', budget: '₹2.50 Cr', pledged: '₹1.10 Cr', focus: 'Mine Fire & Health' },
  { name: 'Jindal Steel & Power CSR', budget: '₹1.20 Cr', pledged: '₹45 Lakh', focus: 'Agriculture Cold Storage' },
  { name: 'NTPC Eastern Region CSR', budget: '₹1.50 Cr', pledged: '₹60 Lakh', focus: 'Clean Energy & Water' },
];

export default function IndustryCsrPage() {
  const { challenges } = useApp();

  const [selectedPartner, setSelectedPartner] = useState(CSR_PARTNERS[0]);
  const [pledgedChallenges, setPledgedChallenges] = useState<string[]>(['ch-jh-001', 'ch-jh-002']);
  const [selectedChallengeToPledge, setSelectedChallengeToPledge] = useState<string | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState('₹15,00,000');
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  const handlePledge = (challengeId: string) => {
    setPledgedChallenges([...pledgedChallenges, challengeId]);
    setPledgeSuccess(true);
    setTimeout(() => {
      setPledgeSuccess(false);
      setSelectedChallengeToPledge(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-cyan-100 text-cyan-800">
              <Briefcase className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800">
              Corporate Social Responsibility & ESG Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Industry CSR Impact Capital Matching
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Channel Section 135 CSR grants directly into high-impact societal challenges. Real-time telemetry and milestone escrow ensure complete fiduciary and ethical compliance.
          </p>
        </div>

        {/* Corporate Selector */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm text-xs self-start md:self-auto">
          <span className="text-slate-500 font-medium">Enterprise:</span>
          <select
            value={selectedPartner.name}
            onChange={(e) => {
              const p = CSR_PARTNERS.find((x) => x.name === e.target.value);
              if (p) setSelectedPartner(p);
            }}
            className="font-bold text-slate-800 bg-transparent focus:outline-none"
          >
            {CSR_PARTNERS.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Corporate Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Annual CSR Allocation</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{selectedPartner.budget}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Section 135 Compliant</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Currently Committed</div>
          <div className="text-2xl font-extrabold text-cyan-800 mt-1">{selectedPartner.pledged}</div>
          <div className="text-[11px] text-slate-400 mt-1">Escrowed for university prototypes</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Verified Beneficiaries</div>
          <div className="text-2xl font-extrabold text-blue-900 mt-1">42,800+</div>
          <div className="text-[11px] text-slate-400 mt-1">Across 4 tribal blocks</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Audit & ESG Rating</div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">AAA+ Verified</div>
          <div className="text-[11px] text-slate-400 mt-1">100% Cryptographic Trail</div>
        </div>
      </div>

      {/* High-Impact Challenges Seeking CSR Grant */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Grassroots Challenges Aligned to {selectedPartner.focus}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Escrow-protected milestone disbursements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((challenge) => {
            const isPledged = pledgedChallenges.includes(challenge.id);
            const partnerMatch = challenge.matchedIndustryPartners[0];

            return (
              <div
                key={challenge.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200">
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

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Target District:</span>
                      <span className="text-blue-800">{challenge.district}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Affected Citizens:</span>
                      <span className="font-semibold text-slate-900">
                        {challenge.affectedPopulationEstimate.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Grant Funding Need:</span>
                      <span className="font-bold text-emerald-700">
                        {partnerMatch?.fundingPotential || '₹25,00,000'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  {isPledged ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Grant Pledged by {selectedPartner.name.split(' ')[0]}
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePledge(challenge.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-800 hover:bg-cyan-900 text-white font-semibold text-xs shadow-sm transition-colors"
                    >
                      Pledge CSR Grant
                    </button>
                  )}

                  <Link
                    href={`/challenges/${challenge.id}`}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    View Metrics →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Escrow & Fiduciary Trust Architecture */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-8 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>Fiduciary Trust & Milestone Escrow Protocol</span>
        </div>
        <h3 className="text-xl font-bold text-white">How CivicSolve AI Protects Corporate CSR Investments</h3>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          Unlike traditional unmonitored philanthropy, CivicSolve AI releases CSR capital in verified tranches. Funds are released only when: (1) Academic faculty mentors submit laboratory test benchmarks, (2) IoT telemetry confirms field sensor deployment, and (3) Panchayat citizens confirm tangible relief via biometric or OTP verification.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="font-bold text-white text-xs mb-1">Tranche 1 (30%)</div>
            <p className="text-[11px] text-slate-400">Released upon University Capstone team formation & design approval.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="font-bold text-white text-xs mb-1">Tranche 2 (40%)</div>
            <p className="text-[11px] text-slate-400">Released upon prototype hardware fabrication & lab test validation.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="font-bold text-white text-xs mb-1">Tranche 3 (30%)</div>
            <p className="text-[11px] text-slate-400">Released upon citizen field pilot deployment and >85% satisfaction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
