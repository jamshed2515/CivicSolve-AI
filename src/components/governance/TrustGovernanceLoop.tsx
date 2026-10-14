'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Eye, Activity, CheckCircle2 } from 'lucide-react';

interface TrustGovernanceLoopProps {
  currentStep?: 1 | 2 | 3 | 4;
  className?: string;
}

export default function TrustGovernanceLoop({
  currentStep = 2,
  className = '',
}: TrustGovernanceLoopProps) {
  const steps = [
    {
      step: 1,
      title: '1. Transparent Citizen Submission & Consent',
      desc: 'Multi-modal intake (voice/text/media) with explicit privacy consent, PII masking, and real-time clustering notice.',
      icon: Eye,
      color: 'border-blue-500 text-blue-700 bg-blue-50/50',
      tag: 'Citizen Trust',
    },
    {
      step: 2,
      title: '2. Explainable AI Categorization & Routing',
      desc: 'NLP domain prediction, pgvector semantic deduplication, and priority scoring with human review on low confidence.',
      icon: Activity,
      color: 'border-indigo-500 text-indigo-700 bg-indigo-50/50',
      tag: 'Explainable AI',
    },
    {
      step: 3,
      title: '3. Accountable Institutional & Industry Execution',
      desc: 'Academic multidisciplinary teams and CSR sponsors co-develop prototypes under documented milestone accountability.',
      icon: UserCheck,
      color: 'border-cyan-500 text-cyan-700 bg-cyan-50/50',
      tag: 'Human Accountability',
    },
    {
      step: 4,
      title: '4. Verifiable Public Dashboard & Audit Trail',
      desc: 'Tamper-evident logs, post-pilot community satisfaction confirmation, and district algorithmic fairness audits.',
      icon: ShieldCheck,
      color: 'border-emerald-500 text-emerald-700 bg-emerald-50/50',
      tag: 'Verifiable Impact',
    },
  ];

  return (
    <div className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-100 text-blue-800">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              The Trust-Centric AI Governance Loop
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Societal Innovation Collaboration Portal Architecture (Reference: Figure 1, Research Framework)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Continuous Loop • Non-Autonomous AI
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((item) => {
          const Icon = item.icon;
          const isActive = currentStep === item.step;
          const isPassed = currentStep > item.step;

          return (
            <div
              key={item.step}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                isActive
                  ? `${item.color} shadow-md ring-2 ring-blue-500/20`
                  : isPassed
                  ? 'border-slate-200 bg-slate-50/70 text-slate-700'
                  : 'border-slate-100 bg-white text-slate-400 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{item.tag}</span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5">{item.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-500">Stage {item.step} of 4</span>
                {isActive && (
                  <span className="inline-flex items-center gap-1 font-bold text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                    Active Stage
                  </span>
                )}
                {isPassed && <span className="font-semibold text-emerald-700">Completed</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
