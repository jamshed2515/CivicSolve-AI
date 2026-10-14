'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Users,
  Droplets,
  HeartPulse,
  Flame,
  Truck,
  ArrowRight,
  ShieldCheck,
  FileDown,
  Activity,
  MapPin,
} from 'lucide-react';

export default function ImpactObservatoryPage() {
  const { challenges, projects } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-teal-100 text-teal-800">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Verifiable Public Impact & Real-World Outcomes
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Societal Impact Observatory
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Real outcomes powered by collaborative problem-solving. From high-arsenic water filtration in Sahibganj to rapid modular causeways in Khunti.
          </p>
        </div>

        <button
          onClick={() => alert('Downloading Verified CivicSolve AI Public Impact Report (Q1 2026 PDF)...')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all self-start md:self-auto"
        >
          <FileDown className="w-4 h-4 text-emerald-400" />
          <span>Download Impact Audit (PDF)</span>
        </button>
      </div>

      {/* Aggregate Real-World Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">185,000+</div>
          <div className="text-xs font-bold text-slate-700">Citizens Directly Impacted</div>
          <p className="text-[11px] text-slate-400">Across 14 remote and aspirational blocks in Jharkhand.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">1.2M L/day</div>
          <div className="text-xs font-bold text-slate-700">Clean Potable Water Delivered</div>
          <p className="text-[11px] text-slate-400">Arsenic levels reduced to &lt;0.01 mg/L (WHO safe standards).</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">8 Villages</div>
          <div className="text-xs font-bold text-slate-700">Critical Access Reconnected</div>
          <p className="text-[11px] text-slate-400">Emergency 108 ambulances & school transport restored in Murhu.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">62% Reduction</div>
          <div className="text-xs font-bold text-slate-700">Toxic Coal Fire Smoke Exposure</div>
          <p className="text-[11px] text-slate-400">Automated thermal capping in Jharia mining settlements.</p>
        </div>
      </div>

      {/* Case Studies Spotlight: Before and After */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-700" />
          <h2 className="text-xl font-bold text-slate-900">
            Field Deployed Engineering Solutions: Case Studies
          </h2>
        </div>

        {/* Case 1: Khunti Modular Causeway */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Rural Infrastructure & Mobility
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Modular Pre-Cast High-Flood Causeway Bridge • Murhu Block, Khunti
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Pilot Commissioned & Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2 text-xs">
              <div className="font-bold text-rose-800 uppercase tracking-wider text-[10px]">
                Before Intervention (Grassroots Challenge)
              </div>
              <p className="text-slate-700 leading-relaxed">
                Seasonal flash floods submerged the river crossing for 4 months annually. 8 villages cut off from Murhu Community Health Centre (CHC). 3 reported medical emergencies unable to reach emergency care in 2025.
              </p>
              <div className="text-[11px] text-slate-500 pt-1">
                • 18 Citizen reports clustered • AI Priority: 88/100
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2 text-xs">
              <div className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
                Collaborative Solution & Verified Impact
              </div>
              <p className="text-slate-700 leading-relaxed">
                BIT Mesra Civil Engineering team designed an inverted siphon pre-cast modular causeway in 6 weeks. Supported by ₹25L Tata Steel CSR grant. Transit time reduced from 2.5 hours detour to 4 minutes.
              </p>
              <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                • 94% Citizen satisfaction confirmed via Panchayat CSC feedback
              </div>
            </div>
          </div>
        </div>

        {/* Case 2: Sahibganj Arsenic Filtration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200">
                Water & Sanitation
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Nanotech Graphene Filtration for High-Arsenic Tubewells • Barharwa, Sahibganj
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Pilot Active • IoT Monitored
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2 text-xs">
              <div className="font-bold text-rose-800 uppercase tracking-wider text-[10px]">
                Before Intervention (Grassroots Challenge)
              </div>
              <p className="text-slate-700 leading-relaxed">
                Groundwater in 12 villages contained 0.08 mg/L arsenic (8x WHO threshold) and severe fluoride causing dental and skeletal fluorosis across 2,400 school children.
              </p>
              <div className="text-[11px] text-slate-500 pt-1">
                • 24 Citizen reports clustered • AI Priority: 94/100
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2 text-xs">
              <div className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
                Collaborative Solution & Verified Impact
              </div>
              <p className="text-slate-700 leading-relaxed">
                IIT (ISM) Dhanbad Department of Environmental Science deployed low-cost iron-oxide coated sand and graphene filters. IoT turbidity sensors transmit live to District Water Office.
              </p>
              <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                • 0.006 mg/L current arsenic reading (100% compliant with potable norms)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
