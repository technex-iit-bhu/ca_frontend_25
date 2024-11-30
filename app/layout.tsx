import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/app/layout/NavBar';

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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
