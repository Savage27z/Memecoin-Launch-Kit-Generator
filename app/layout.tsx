import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Memecoin Launch Kit Generator',
  description: 'One click. Full launch campaign. Powered by AI and Ace Data Cloud.',
  keywords: ['memecoin', 'crypto', 'AI', 'launch kit', 'Ace Data Cloud'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-bg text-white antialiased">
        <div className="relative min-h-screen flex flex-col">
          <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-neon-green/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-neon-purple/[0.04] rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
