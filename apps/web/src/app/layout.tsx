import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ramchandrapur Ekota Club | Digital Management Platform',
  description:
    'Official enterprise platform for Ramchandrapur Ekota Club — social welfare, emergency blood donor network, financial transparency, and member services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
