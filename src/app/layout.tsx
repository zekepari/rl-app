import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Nav from '@/app/_components/Nav';
import Footer from '@/app/_components/Footer'
import { auth } from '@/auth';
import { SpeedInsights } from '@vercel/speed-insights/next'

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RoLinker',
  description: 'Access your Roblox accounts on Discord',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <head>
          <meta name="google-adsense-account" content="ca-pub-5223562584661630" />
        </head>
        <body className={`${open_sans.className} bg-neutral-900 text-neutral-100 tracking-wide overflow-y-auto`}>
          <div className='min-h-screen'>
            <Nav />
            {children}
          </div>
          <hr className='border-neutral-800' />
          <Footer />
          <SpeedInsights />
        </body>
      </html>
    </SessionProvider>
  );
};