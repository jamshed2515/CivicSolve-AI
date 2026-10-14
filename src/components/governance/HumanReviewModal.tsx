'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { ChallengeDomain, UserRole } from '@/lib/types';
import { ShieldAlert, CheckCircle, X, AlertTriangle, UserCheck } from 'lucide-react';

interface HumanReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  reportCode: string;
  currentDomain: ChallengeDomain;
  currentSeverity: number;
}

const DOMAINS: ChallengeDomain[] = [
  'Rural Infrastructure & Mobility',
  'Water & Sanitation',
  'Waste Management & Environment',
  'Agriculture & Soil Health',
  'Public Health & Nutrition',
  'Renewable Energy & Power',
  'Education & Digital Literacy',
];

export default function HumanReviewModal({
  isOpen,
  onClose,
  reportId,
  reportCode,
  currentDomain,
  currentSeverity,
}: HumanReviewModalProps) {
  const { overrideAiClassification, currentRole } = useApp();

  const [selectedDomain, setSelectedDomain] = useState<ChallengeDomain>(currentDomain);
  const [severity, setSeverity] = useState<number>(currentSeverity);
  const [justification, setJustification] = useState<string>('');
  const [actorName, setActorName] = useState<string>('Er. R. K. Mahato (Sub-Divisional Officer)');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!justification.trim()) return;

    overrideAiClassification(
      reportId,
      selectedDomain,
      severity,
      justification,
      actorName,
      currentRole
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm">Human-in-the-Loop Override Console</h3>
              <p className="text-[11px] text-slate-400">Contesting AI Recommendation for {reportCode}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Decision Successfully Overridden & Logged</h4>
            <p className="text-xs text-slate-500">
              Tamper-evident audit record generated with SHA-256 hash. Re-routing affected downstream queues.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-amber-800">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-semibold">Institutional Accountability Requirement</p>
                <p className="text-[11px] mt-0.5">
                  Any override of an AI categorization is permanent and logged on the public tamper-evident audit trail.
                  State officials or coordinators assume legal and operational accountability for this routing.
                </p>
              </div>
            </div>

            {/* Change Domain */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Override Problem Domain:
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value as ChallengeDomain)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {DOMAINS.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
            </div>

            {/* Adjust Severity Score */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  Priority / Severity Score:
                </label>
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {severity} / 100
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="99"
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Routine (30)</span>
                <span>Moderate (65)</span>
                <span>Critical / Emergency (99)</span>
              </div>
            </div>

            {/* Accountable Official Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Accountable Officer / Coordinator Name:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={actorName}
                  onChange={(e) => setActorName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Justification */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Mandatory Reason / Justification for Override:
              </label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="e.g. Field inspection by Gram Panchayat confirms school access is completely submerged, requiring multi-departmental bridge engineering rather than simple road patching."
                rows={3}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!justification.trim()}
                className="px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-semibold shadow transition-colors disabled:opacity-50"
              >
                Authorize & Record Override
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
