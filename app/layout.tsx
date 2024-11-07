import Navbar from './components/navbar';
import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'CA Portal',
  description: "CA Portal : Technex'25, IIT BHU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#191919]`}>
        <Navbar />
        <main className="flex justify-center p-8 w-full">
          <div className="w-full max-w-screen-xl">{children}</div>
        </main>
      </body>
    </html>
  );
}
