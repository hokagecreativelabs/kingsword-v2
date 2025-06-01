'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css'; // Adjust path as needed

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body>
        {!isAdminRoute && <Navbar />}
        <main className={!isAdminRoute ? 'min-h-screen' : ''}>
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}