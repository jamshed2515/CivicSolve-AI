'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  FileText,
  UserCheck,
  Scale,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function PrivacyCharterPage() {
  const [sampleText, setSampleText] = useState(
    'My name is Rameshwar Soren, phone 9876543210, Aadhaar 4521-8902-1144, living in Rungra Tola, Murhu. Our well water is poisoned.'
  );

  // Real-time PII anonymization demonstrator
  const anonymizedText = sampleText
    .replace(/[0-9]{10}/g, '+91 98****3210')
    .replace(/[0-9]{4}-[0-9]{4}-[0-9]{4}/g, 'XXXX-XXXX-1144')
    .replace(/Rameshwar Soren/gi, 'R*** S**** (Masked Citizen)');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-emerald-100 text-emerald-800">
              <Lock className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              DPDP Act 2023 Compliance & Ethical Architecture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Citizen Privacy & Granular Consent Charter
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Grassroots governance requires uncompromising citizen trust. CivicSolve AI enforces automatic PII redaction and mathematical differential privacy before any data reaches university or corporate partners.
          </p>
        </div>

        <Link
          href="/submit"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-all self-start md:self-auto"
        >
          <span>Report with Privacy Shield</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Interactive PII Anonymization Simulator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              Live Edge PII Anonymization Demonstration
            </h2>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Real-Time Edge Redaction
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Type or modify text containing personal identifiers (names, mobile numbers, Aadhaar format) to inspect how the client-side redaction engine masks sensitive details before ingestion into the AI knowledge graph:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Input Citizen Speech / Raw Text:</span>
              <span className="text-rose-600 text-[11px] font-normal">Unsanitized Input</span>
            </label>
            <textarea
              rows={4}
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-300 p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Sanitized Public Research Version:</span>
              <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Anonymized Output
              </span>
            </label>
            <div className="w-full h-[106px] text-xs rounded-xl border border-emerald-200 bg-emerald-50/30 p-3.5 font-mono text-slate-800 leading-relaxed overflow-y-auto">
              {anonymizedText}
            </div>
          </div>
        </div>
      </div>

      {/* The 4 DPDP Citizen Rights Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-bold text-sm text-slate-900">Right to Transparent Notice</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Citizens receive immediate audio/SMS receipts in their native language explaining that their issue was recorded and grouped for university engineering.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-bold text-sm text-slate-900">Granular Purpose Limitation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Data is strictly quarantined for public problem solving. Zero commercial marketing or third-party behavioral profiling is permitted.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-bold text-sm text-slate-900">Right to Explanation & Correction</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Citizens can inspect the AI rationale assigned to their report and request human reassessment if misclassified.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            4
          </div>
          <h3 className="font-bold text-sm text-slate-900">Right to Consent Erasure</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Citizens can withdraw their report or opt out of university research contact at any time via the Citizen Hub.
          </p>
        </div>
      </div>
    </div>
  );
}
