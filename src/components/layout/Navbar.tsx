'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { UserRole } from '@/lib/types';
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Users,
  Landmark,
  UserCheck,
  PlusCircle,
  FileCheck2,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

const ROLES: { id: UserRole; label: string; icon: React.ElementType; badge: string; color: string }[] = [
  { id: 'citizen', label: 'Citizen / Community', icon: Users, badge: 'Public', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'university', label: 'University Coordinator', icon: Building2, badge: 'Academic', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'student', label: 'Student / Innovation Team', icon: GraduationCap, badge: 'Innovator', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'researcher', label: 'Researcher / Faculty', icon: GraduationCap, badge: 'R&D', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { id: 'industry', label: 'Industry CSR Partner', icon: Briefcase, badge: 'Partner', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'government', label: 'Government Official', icon: Landmark, badge: 'Authority', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'admin', label: 'Platform Admin / Auditor', icon: UserCheck, badge: 'Trustee', color: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currentRole, setCurrentRole, language, setLanguage } = useApp();
  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);

  const activeRoleObj = ROLES.find((r) => r.id === currentRole) || ROLES[0];
  const ActiveIcon = activeRoleObj.icon;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Top Notification Bar for Hackathon and State Context */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            SIH26043
          </span>
          <span className="font-medium text-slate-300">
            Societal Innovation Collaboration Portal • Govt. of Jharkhand & Academic Research Framework
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Trustworthy AI Verification Active (XAI & HITL Enabled)
          </span>
          <button
            onClick={() => setLanguage(language === 'English' ? 'Hindi' : 'English')}
            className="text-slate-300 hover:text-white underline text-[11px] font-medium"
          >
            {language === 'English' ? 'हिन्दी में बदलें' : 'Switch to English'}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  CIVICSOLVE<span className="text-blue-700">.AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Gov 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Societal Challenge Discovery & Collaborative Innovation
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            <Link
              href="/challenges"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname.startsWith('/challenges')
                  ? 'text-blue-700 bg-blue-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Challenge Marketplace
            </Link>

            {/* Role-specific Quick Links */}
            {currentRole === 'citizen' && (
              <Link
                href="/citizen"
                className={`px-3 py-2 rounded-md transition-colors ${
                  pathname === '/citizen' ? 'text-blue-700 bg-blue-50/80 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Citizen Hub
              </Link>
            )}

            {currentRole === 'university' && (
              <Link
                href="/university"
                className={`px-3 py-2 rounded-md transition-colors ${
                  pathname === '/university' ? 'text-blue-700 bg-blue-50/80 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                University Workspace
              </Link>
            )}

            {currentRole === 'industry' && (
              <Link
                href="/industry"
                className={`px-3 py-2 rounded-md transition-colors ${
                  pathname === '/industry' ? 'text-blue-700 bg-blue-50/80 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Industry CSR Portal
              </Link>
            )}

            {currentRole === 'government' && (
              <Link
                href="/government"
                className={`px-3 py-2 rounded-md transition-colors ${
                  pathname === '/government' ? 'text-blue-700 bg-blue-50/80 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Gov Heatmap & Validation
              </Link>
            )}

            {(currentRole === 'student' || currentRole === 'researcher') && (
              <Link
                href="/workspace/prj-001"
                className={`px-3 py-2 rounded-md transition-colors ${
                  pathname.startsWith('/workspace') ? 'text-blue-700 bg-blue-50/80 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Project Workspace
              </Link>
            )}

            <Link
              href="/impact"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === '/impact' ? 'text-blue-700 bg-blue-50/80 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Impact Observatory
            </Link>

            <Link
              href="/audit"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === '/audit' ? 'text-blue-700 bg-blue-50/80 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Audit Trail & Trust
            </Link>
          </nav>

          {/* Right Action Area: Role Switcher & Submit CTA */}
          <div className="flex items-center gap-3">
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shadow-sm ${activeRoleObj.color}`}
                title="Switch Stakeholder Persona"
              >
                <ActiveIcon className="w-4 h-4" />
                <span className="hidden md:inline font-semibold">{activeRoleObj.label}</span>
                <span className="md:hidden font-semibold">{activeRoleObj.badge}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Stakeholder View
                  </div>
                  <div className="py-1">
                    {ROLES.map((role) => {
                      const Icon = role.icon;
                      const isSelected = role.id === currentRole;
                      return (
                        <button
                          key={role.id}
                          onClick={() => {
                            setCurrentRole(role.id);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                            isSelected ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-700' : 'text-slate-400'}`} />
                            <span>{role.label}</span>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${role.color}`}>
                            {role.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button: Submit Problem */}
            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold shadow-md shadow-blue-900/10 transition-all hover:shadow-lg active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Challenge</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
