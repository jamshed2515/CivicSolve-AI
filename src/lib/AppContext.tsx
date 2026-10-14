'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  ProblemReport,
  AIAnalysisResult,
  SocietalChallenge,
  CollaborationProject,
  AuditLogEntry,
  DistrictFairnessData,
  ChallengeDomain,
} from './types';
import {
  INITIAL_PROBLEM_REPORTS,
  INITIAL_AI_ANALYSIS,
  INITIAL_SOCIETAL_CHALLENGES,
  INITIAL_PROJECTS,
  INITIAL_AUDIT_LOGS,
  DISTRICT_FAIRNESS_DATA,
} from '../data/mockData';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  language: 'English' | 'Hindi';
  setLanguage: (lang: 'English' | 'Hindi') => void;
  reports: ProblemReport[];
  aiAnalyses: Record<string, AIAnalysisResult>;
  challenges: SocietalChallenge[];
  projects: CollaborationProject[];
  auditLogs: AuditLogEntry[];
  fairnessData: DistrictFairnessData[];
  submitNewReport: (
    report: Omit<ProblemReport, 'id' | 'code' | 'createdAt' | 'status'>,
    analysis: AIAnalysisResult
  ) => { report: ProblemReport; analysis: AIAnalysisResult };
  overrideAiClassification: (
    reportId: string,
    newDomain: ChallengeDomain,
    newSeverity: number,
    justification: string,
    actorName: string,
    actorRole: UserRole
  ) => void;
  validateChallengeStatus: (
    challengeId: string,
    approverName: string,
    approverRole: string,
    department: string
  ) => void;
  verifyMilestone: (
    projectId: string,
    milestoneId: string,
    verifierName: string
  ) => void;
  reverseDuplicateMerge: (
    reportId: string,
    clusterId: string,
    justification: string
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [reports, setReports] = useState<ProblemReport[]>(INITIAL_PROBLEM_REPORTS);
  const [aiAnalyses, setAiAnalyses] = useState<Record<string, AIAnalysisResult>>(INITIAL_AI_ANALYSIS);
  const [challenges, setChallenges] = useState<SocietalChallenge[]>(INITIAL_SOCIETAL_CHALLENGES);
  const [projects, setProjects] = useState<CollaborationProject[]>(INITIAL_PROJECTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [fairnessData, setFairnessData] = useState<DistrictFairnessData[]>(DISTRICT_FAIRNESS_DATA);

  const submitNewReport = (
    reportData: Omit<ProblemReport, 'id' | 'code' | 'createdAt' | 'status'>,
    analysisData: AIAnalysisResult
  ) => {
    const reportNum = 1050 + reports.length;
    const newReportId = `rep-${Date.now()}`;
    const code = `REP-JH-2026-${reportNum}`;

    const newReport: ProblemReport = {
      ...reportData,
      id: newReportId,
      code,
      status: analysisData.matchedClusterId ? 'CLUSTERED' : 'SUBMITTED',
      clusterId: analysisData.matchedClusterId,
      createdAt: new Date().toISOString(),
    };

    const finalAnalysis = {
      ...analysisData,
      reportId: newReportId,
    };

    setReports((prev) => [newReport, ...prev]);
    setAiAnalyses((prev) => ({ ...prev, [newReportId]: finalAnalysis }));

    // Append Audit Log
    const newLog: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      entityType: 'REPORT',
      entityCode: code,
      actorRole: currentRole,
      actorName: currentRole === 'citizen' ? 'Citizen (Masked)' : 'Platform System',
      action: 'AI_INGEST',
      aiRecommendationSnapshot: `Domain: ${analysisData.predictedDomain} (${(analysisData.domainConfidence * 100).toFixed(0)}%). Severity: ${analysisData.severityScore}.`,
      decisionTaken: analysisData.humanReviewRequired
        ? 'Flagged for Human Review in District Moderation Queue'
        : 'Auto-accepted into Societal Discovery Pool',
      hashSignature: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    return { report: newReport, analysis: finalAnalysis };
  };

  const overrideAiClassification = (
    reportId: string,
    newDomain: ChallengeDomain,
    newSeverity: number,
    justification: string,
    actorName: string,
    actorRole: UserRole
  ) => {
    const targetReport = reports.find((r) => r.id === reportId);
    const prevAnalysis = aiAnalyses[reportId];

    if (!targetReport || !prevAnalysis) return;

    setAiAnalyses((prev) => ({
      ...prev,
      [reportId]: {
        ...prev[reportId],
        predictedDomain: newDomain,
        severityScore: newSeverity,
        isOverridden: true,
        overrideNote: justification,
      },
    }));

    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, categorySuggested: newDomain, status: 'VALIDATED' } : r
      )
    );

    // Append Audit Trail of Override
    const overrideLog: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      entityType: 'REPORT',
      entityCode: targetReport.code,
      actorRole,
      actorName,
      action: 'HUMAN_OVERRIDE',
      aiRecommendationSnapshot: `AI Recommended: ${prevAnalysis.predictedDomain} (Severity: ${prevAnalysis.severityScore})`,
      decisionTaken: `OVERRIDDEN TO: ${newDomain} (Severity: ${newSeverity})`,
      overrideJustification: justification,
      hashSignature: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    setAuditLogs((prev) => [overrideLog, ...prev]);
  };

  const validateChallengeStatus = (
    challengeId: string,
    approverName: string,
    approverRole: string,
    department: string
  ) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              validationStatus: 'Institutional Match',
              lifecycleStage: 'Team Formation',
              validatedBy: {
                name: approverName,
                role: approverRole,
                department,
                timestamp: new Date().toISOString(),
              },
            }
          : c
      )
    );

    const ch = challenges.find((c) => c.id === challengeId);
    if (ch) {
      const log: AuditLogEntry = {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString(),
        entityType: 'CHALLENGE',
        entityCode: ch.code,
        actorRole: 'government',
        actorName: approverName,
        action: 'HUMAN_VALIDATE',
        aiRecommendationSnapshot: `AI Severity: ${ch.severityScore}, Match Score: ${ch.aiMatchingScore}%`,
        decisionTaken: 'Formally Validated Societal Challenge. Opened for University & CSR matchmaking.',
        hashSignature: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      };
      setAuditLogs((prev) => [log, ...prev]);
    }
  };

  const verifyMilestone = (
    projectId: string,
    milestoneId: string,
    verifierName: string
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedMilestones = proj.milestones.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status: 'VERIFIED' as const,
                completedDate: new Date().toISOString().split('T')[0],
                verifiedBy: verifierName,
                citizenVerificationRate: 95,
              }
            : m
        );
        return {
          ...proj,
          milestones: updatedMilestones,
          currentMilestoneIndex: Math.min(proj.milestones.length - 1, proj.currentMilestoneIndex + 1),
        };
      })
    );
  };

  const reverseDuplicateMerge = (
    reportId: string,
    clusterId: string,
    justification: string
  ) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, clusterId: undefined, status: 'SUBMITTED' } : r
      )
    );

    const targetReport = reports.find((r) => r.id === reportId);
    if (targetReport) {
      const log: AuditLogEntry = {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString(),
        entityType: 'CLUSTER',
        entityCode: clusterId,
        actorRole: currentRole,
        actorName: 'Moderator (Manual De-merge)',
        action: 'MERGE_REVERSED',
        aiRecommendationSnapshot: `Previously merged by AI similarity scan`,
        decisionTaken: `Detached report ${targetReport.code} from cluster ${clusterId}. Re-opened as independent track.`,
        overrideJustification: justification,
        hashSignature: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      };
      setAuditLogs((prev) => [log, ...prev]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        reports,
        aiAnalyses,
        challenges,
        projects,
        auditLogs,
        fairnessData,
        submitNewReport,
        overrideAiClassification,
        validateChallengeStatus,
        verifyMilestone,
        reverseDuplicateMerge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
