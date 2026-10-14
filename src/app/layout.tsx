import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'CivicSolve AI | Trustworthy AI for Citizen-Centric Digital Governance',
  description:
    'Smart India Hackathon (SIH26043) Solution: Transforming unstructured citizen voices into validated societal challenges, connected to universities, researchers, and CSR partners for measurable public impact.',
  keywords: [
    'CivicSolve AI',
    'SIH26043',
    'Trustworthy AI',
    'Digital Governance',
    'Citizen Centric',
    'Human in the loop',
    'Explainable AI',
    'Jharkhand Higher Education',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <AppProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
