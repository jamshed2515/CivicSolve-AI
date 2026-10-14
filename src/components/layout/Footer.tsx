import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Scale, FileText, Lock, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Platform identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>CIVICSOLVE AI</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Academic & Public Innovation
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-lg text-xs">
              Transforming fragmented citizen voices into structured, validated societal challenges.
              Connecting grassroots problems with universities, researchers, student innovators, and industry CSR
              partners for collaborative engineering and measurable public impact.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p>• Smart India Hackathon Problem Statement <strong>SIH26043</strong></p>
              <p>• Theme: <em>Trustworthy AI for Citizen-Centric Digital Governance and Intelligent Public Services</em></p>
              <p>• Pilot Blueprint for Department of Higher & Technical Education, Government of Jharkhand</p>
            </div>
          </div>

          {/* Col 2: Core Lifecycles */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Governance Lifecycle</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/submit" className="hover:text-white transition-colors">
                  1. Transparent Problem Intake
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-white transition-colors">
                  2. AI-Assisted Clustering & XAI
                </Link>
              </li>
              <li>
                <Link href="/university" className="hover:text-white transition-colors">
                  3. University & Team Matching
                </Link>
              </li>
              <li>
                <Link href="/workspace/prj-001" className="hover:text-white transition-colors">
                  4. Prototyping & Pilot Tracking
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition-colors">
                  5. Verifiable Public Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Accountability */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Trustworthy AI & Ethics</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/audit" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-blue-400" />
                  Audit Trail & HITL Overrides
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Citizen Privacy & Consent
                </Link>
              </li>
              <li>
                <Link href="/government" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  District Algorithmic Fairness
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Explainable Decision Cards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 CivicSolve AI. Developed for National Innovation & Societal Impact.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Pillars: Transparency • Accountability • Fairness • Explainability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
