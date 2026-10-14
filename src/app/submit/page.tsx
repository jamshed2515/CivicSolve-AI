'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { runAiProblemAnalysis } from '@/lib/ai-service';
import { ChallengeDomain, AIAnalysisResult } from '@/lib/types';
import ConfidenceMeter from '@/components/ai/ConfidenceMeter';
import {
  Mic,
  MicOff,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  FileCheck2,
  RefreshCw,
  Info,
  MapPin,
  Volume2,
} from 'lucide-react';

const DISTRICTS_BLOCKS: Record<string, string[]> = {
  Khunti: ['Murhu', 'Torpa', 'Karra', 'Rania'],
  Sahibganj: ['Barharwa', 'Rajmahal', 'Taljhari', 'Udhwa'],
  Dhanbad: ['Jharia', 'Baghmara', 'Nirsa', 'Topchanchi'],
  Ranchi: ['Kanke', 'Namkum', 'Ormanjhi', 'Burmu'],
  Simdega: ['Kolebira', 'Bano', 'Thethaitangar', 'Jaldega'],
  Dumka: ['Gopikandar', 'Jama', 'Jarmundi', 'Kathikund'],
};

const SAMPLE_VOICE_PROMPTS = [
  {
    lang: 'Hindi',
    label: 'खूंटी: बाढ़ में पुलिया बह जाना',
    text: 'हमारे मुरहू ब्लॉक के रुंगड़ा गांव में जो कॉजवे पुलिया थी, वो पिछली बारिश में टूट गई है। 8 गांव कट गए हैं और एंबुलेंस नहीं आ पा रही है। बच्चे 6 महीने से स्कूल नहीं जा पा रहे।',
    district: 'Khunti',
    block: 'Murhu',
  },
  {
    lang: 'Hindi',
    label: 'साहिबगंज: पानी में आर्सेनिक और फ्लोराइड',
    text: 'बरहरवा प्रखंड में बोरवेल का पानी बहुत गंदा और पीला आ रहा है। बच्चों के दांत पीले पड़ रहे हैं और हड्डियों में दर्द हो रहा है। डॉक्टर ने कहा इसमें आर्सेनिक और फ्लोराइड ज्यादा है।',
    district: 'Sahibganj',
    block: 'Barharwa',
  },
  {
    lang: 'Hindi',
    label: 'धनबाद: झरिया कोयला खदान की आग व धुआं',
    text: 'झरिया के बस्तकोला क्षेत्र में कोयला खदान की भूमिगत आग से जहरीला धुआं और सल्फर गैस घरों में आ रही है। सड़क धंस रही है और सांस लेना मुश्किल हो गया है।',
    district: 'Dhanbad',
    block: 'Jharia',
  },
  {
    lang: 'Santali / Khortha',
    label: 'सिमडेगा: लाह (लाख) की फसल खराब होना',
    text: 'कुसुम और बेर के पेड़ों पर लाह (lac harvest) का कीड़ा फंगस से मर रहा है। हमारे पास सुरक्षित कोल्ड स्टोरेज नहीं है जिससे 40 क्विंटल लाह सड़ रहा है।',
    district: 'Simdega',
    block: 'Kolebira',
  },
];

export default function SubmitReportPage() {
  const { submitNewReport, language } = useApp();

  const [citizenName, setCitizenName] = useState('Birsingh Munda');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [selectedDistrict, setSelectedDistrict] = useState('Khunti');
  const [selectedBlock, setSelectedBlock] = useState('Murhu');
  const [reportText, setReportText] = useState(SAMPLE_VOICE_PROMPTS[0].text);
  const [inputLang, setInputLang] = useState<'Hindi' | 'English' | 'Santali' | 'Khortha'>('Hindi');
  const [channel, setChannel] = useState<'Web Portal' | 'Mobile Voice Assistant' | 'Panchayat CSC Facilitator'>('Mobile Voice Assistant');
  const [hasMedia, setHasMedia] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{ code: string; reportId: string } | null>(null);

  // Privacy consents (DPDP compliant)
  const [maskPii, setMaskPii] = useState(true);
  const [allowOpenData, setAllowOpenData] = useState(true);
  const [allowUniAccess, setAllowUniAccess] = useState(true);
  const [allowCsrContact, setAllowCsrContact] = useState(true);

  // Live AI analysis simulation
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);

  useEffect(() => {
    if (reportText.trim().length > 10) {
      const res = runAiProblemAnalysis(reportText, selectedDistrict, selectedBlock, inputLang, hasMedia);
      setAnalysis(res);
    } else {
      setAnalysis(null);
    }
  }, [reportText, selectedDistrict, selectedBlock, inputLang, hasMedia]);

  const handleSimulateVoice = (sample: typeof SAMPLE_VOICE_PROMPTS[0]) => {
    setIsRecording(true);
    setTimeout(() => {
      setReportText(sample.text);
      setSelectedDistrict(sample.district);
      setSelectedBlock(sample.block);
      setIsRecording(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!analysis) return;

    const reportData = {
      citizenNameMasked: maskPii ? `${citizenName[0]}*** ${citizenName.split(' ')[1] || ''}` : citizenName,
      phoneNumberMasked: maskPii ? `+91 ${phoneNumber.slice(0, 2)}****${phoneNumber.slice(-4)}` : phoneNumber,
      district: selectedDistrict,
      block: selectedBlock,
      coordinates: { lat: 23.07, lng: 85.28 },
      rawText: reportText,
      language: inputLang,
      submissionChannel: channel,
      categorySuggested: analysis.predictedDomain,
      mediaUrls: hasMedia ? ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'] : [],
      consent: {
        allowOpenDataSharing: allowOpenData,
        maskPersonallyIdentifiableInfo: maskPii,
        allowUniversityResearchAccess: allowUniAccess,
        allowIndustryCSRContact: allowCsrContact,
        verifiedAt: new Date().toISOString(),
      },
    };

    const res = submitNewReport(reportData, analysis);
    setSubmittedReceipt({ code: res.report.code, reportId: res.report.id });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title & Trust Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1 rounded bg-blue-100 text-blue-800">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Transparent Intake & Explainable AI Verification
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Report a Local Societal Challenge
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          Submit challenges facing your village, panchayat, or ward. CivicSolve AI performs privacy-safe deduplication and semantic clustering, linking your problem directly to university researchers and corporate CSR funding.
        </p>
      </div>

      {isSubmitted && submittedReceipt ? (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-emerald-200 p-8 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Problem Successfully Ingested</h2>
            <p className="text-sm text-slate-500 mt-1">
              Your report has been cryptographically signed and routed into the state societal innovation pipeline.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Official Tracking Code:</span>
              <span className="font-mono font-bold text-blue-800 text-sm">{submittedReceipt.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">PII Protection Status:</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <Lock className="w-3 h-3" /> DPDP Anonymized
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">AI Clustering Status:</span>
              <span className="font-semibold text-indigo-700">Clustered in High-Priority Queue</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/challenges"
              className="px-5 py-2.5 rounded-xl bg-blue-700 text-white font-semibold text-xs hover:bg-blue-800 transition-colors"
            >
              View in Challenge Marketplace
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setReportText('');
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form & Voice Assistant */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Voice Simulation Bar */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-200">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Multilingual Voice Assistant Simulation</span>
                </div>
                <span className="text-[10px] bg-blue-800/80 px-2 py-0.5 rounded text-blue-200">
                  Rural Ingestion Mode
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                In rural panchayats, citizens speak directly into the CSC microphone in Hindi, Santali, or Khortha. Click a sample to simulate real-time transcription:
              </p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_VOICE_PROMPTS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSimulateVoice(sample)}
                    className="px-3 py-1.5 rounded-lg bg-blue-800/60 hover:bg-blue-700 text-xs text-slate-100 border border-blue-700/60 transition-all text-left flex items-center gap-1.5"
                  >
                    <Mic className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{sample.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              
              {/* Location Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    District (Jharkhand)
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedBlock(DISTRICTS_BLOCKS[e.target.value][0]);
                    }}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {Object.keys(DISTRICTS_BLOCKS).map((d) => (
                      <option key={d} value={d}>
                        {d} District
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Block / Sub-Division
                  </label>
                  <select
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {DISTRICTS_BLOCKS[selectedDistrict]?.map((b) => (
                      <option key={b} value={b}>
                        {b} Block
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Citizen Details with PII Masking Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Citizen / Representative Name
                  </label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    required
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              {/* Problem Description Text Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Detailed Problem Statement & Impact
                  </label>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Language:</span>
                    <select
                      value={inputLang}
                      onChange={(e) => setInputLang(e.target.value as any)}
                      className="border border-slate-200 rounded px-1.5 py-0.5 text-[11px]"
                    >
                      <option value="Hindi">Hindi (हिन्दी)</option>
                      <option value="English">English</option>
                      <option value="Santali">Santali (संताली)</option>
                      <option value="Khortha">Khortha (खोरठा)</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows={5}
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    required
                    className="w-full text-xs rounded-xl border border-slate-300 p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
                    placeholder="Describe the issue in detail: What is broken? How many households are affected? Is there an immediate safety or medical risk?"
                  />
                  {isRecording && (
                    <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md border border-blue-200 text-blue-700 text-xs font-semibold animate-pulse">
                        <Mic className="w-4 h-4 text-rose-500" />
                        <span>Transcribing spoken audio in real-time...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Media Upload Simulation */}
              <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Photographic or Video Evidence
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Attached: Geo-tagged photo proof from Murhu Block (2.4 MB)
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasMedia}
                    onChange={(e) => setHasMedia(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Include Evidence</span>
                </label>
              </div>

              {/* DPDP Act 2023 Compliant Citizen Privacy Shield */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Digital Personal Data Protection (DPDP) Privacy Shield
                  </span>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={maskPii}
                      onChange={(e) => setMaskPii(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      <strong>Mask PII:</strong> Obfuscate my name and phone number on public research dashboards to safeguard privacy.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowUniAccess}
                      onChange={(e) => setAllowUniAccess(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      <strong>Academic Collaboration:</strong> Authorize accredited engineering faculties and student teams to inspect this issue for solution prototyping.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowCsrContact}
                      onChange={(e) => setAllowCsrContact(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      <strong>CSR Sponsorship:</strong> Allow vetted corporate CSR partners to allocate funding for this challenge.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={!analysis}
                className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Submit & Cryptographically Ingest Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Live Explainable AI Inspection Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {analysis ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 sticky top-24">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-sm text-slate-900">
                      Real-Time AI Processing & XAI Attribution
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Live Inference
                  </span>
                </div>

                {/* Domain & Confidence */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-slate-500">Predicted Problem Domain:</span>
                    <div className="text-sm font-bold text-blue-900 bg-blue-50 p-2.5 rounded-lg border border-blue-100 mt-1">
                      {analysis.predictedDomain}
                    </div>
                  </div>

                  <ConfidenceMeter
                    confidence={analysis.domainConfidence}
                    tier={analysis.confidenceTier}
                    size="md"
                  />
                </div>

                {/* Semantic Deduplication & Cluster Matching */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>Semantic Similarity Match (pgvector):</span>
                    <span className="font-mono text-indigo-700 font-bold">
                      {(analysis.semanticSimilarityScore * 100).toFixed(1)}% Cosine Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    AI detected high semantic overlap with an existing priority cluster in <strong>{selectedDistrict}</strong>. Submitting will merge your report, boosting urgency without cluttering the administrative pipeline.
                  </p>
                </div>

                {/* Severity Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">Calculated Severity Score:</span>
                    <span className="font-bold text-rose-700">{analysis.severityScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${analysis.severityScore}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pt-1">
                    <div>• Pop. Weight: 35%</div>
                    <div>• Recurrence: 25%</div>
                    <div>• Vulnerability: 20%</div>
                    <div>• Media Proof: +4 pts</div>
                  </div>
                </div>

                {/* Extracted Key Entities */}
                <div>
                  <span className="text-xs text-slate-500 block mb-1.5">Identified Entities & Keywords:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.keyEntities.map((ent, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Governance Attribution */}
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-700" />
                    <span>Accountable Governance Officer</span>
                  </div>
                  <p>
                    Routed to <strong>{analysis.accountableRole}</strong> for administrative verification. Human review is required before university resource sanction.
                  </p>
                </div>

              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-400 space-y-3">
                <Sparkles className="w-8 h-8 mx-auto text-slate-300" />
                <div className="text-xs font-semibold">Live AI Explanation Card</div>
                <p className="text-[11px]">
                  Type your problem description on the left or click a voice assistant sample to inspect real-time AI domain classification, semantic similarity, and severity weights.
                </p>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
