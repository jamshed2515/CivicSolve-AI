import React from 'react';
import { ConfidenceTier } from '@/lib/types';
import { CheckCircle2, AlertCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ConfidenceMeterProps {
  confidence: number; // 0.00 to 1.00
  tier: ConfidenceTier;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function ConfidenceMeter({
  confidence,
  tier,
  size = 'md',
  showLabel = true,
}: ConfidenceMeterProps) {
  const percent = Math.round(confidence * 100);

  const tierConfig: Record<
    ConfidenceTier,
    { label: string; color: string; bgColor: string; icon: React.ElementType; desc: string }
  > = {
    HIGH: {
      label: 'High Confidence',
      color: 'text-emerald-700 border-emerald-300 bg-emerald-50',
      bgColor: 'bg-emerald-500',
      icon: CheckCircle2,
      desc: 'Automatic routing threshold met (>85%). Transparent log created.',
    },
    MEDIUM: {
      label: 'Medium Confidence',
      color: 'text-amber-700 border-amber-300 bg-amber-50',
      bgColor: 'bg-amber-500',
      icon: AlertTriangle,
      desc: 'Moderate semantic ambiguity. Flagged for human review.',
    },
    LOW: {
      label: 'Low Confidence',
      color: 'text-orange-700 border-orange-300 bg-orange-50',
      bgColor: 'bg-orange-500',
      icon: AlertCircle,
      desc: 'Below automated threshold (<70%). Requires manual classification.',
    },
    ESCALATED: {
      label: 'Mandatory Human Escalation',
      color: 'text-rose-700 border-rose-300 bg-rose-50',
      bgColor: 'bg-rose-600',
      icon: ShieldAlert,
      desc: 'High severity / public safety hazard detected. Authorized officer review required.',
    },
  };

  const current = tierConfig[tier] || tierConfig.HIGH;
  const Icon = current.icon;

  return (
    <div className="space-y-1.5 w-full">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" />
            <span>AI Decision Confidence</span>
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${current.color}`}>
            {percent}% • {current.label}
          </span>
        </div>
      )}

      {/* Visual progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex border border-slate-200">
        <div
          className={`h-full transition-all duration-500 ${current.bgColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-[10px] text-slate-500">{current.desc}</p>
    </div>
  );
}
