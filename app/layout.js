'use client';
import { usePathname } from 'next/navigation';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css'; // Adjust path as needed

const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700'],
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {!isAdminRoute && <Navbar />}
        <main className={!isAdminRoute ? 'page-shell' : ''}>
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}